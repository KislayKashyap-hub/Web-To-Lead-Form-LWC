trigger PreventLeadConversionWithoutEmail on Lead (before update) {
    for (Lead lead : Trigger.new) {
        Lead oldLead = Trigger.oldMap.get(lead.Id);
        System.debug('Lead ID ==> ' + lead.Id);

        // Query Task list directly associated with the Lead (WhoId = Lead.Id)
        List<Task> taskList = [SELECT Id, Subject, Status, ActivityDate, WhoId FROM Task WHERE WhoId = :lead.Id];
        System.debug('Task list size ==> ' + taskList.size());
        
        // If no tasks found directly, query tasks where the WhoId is related to a Contact converted from the Lead
        if (taskList.isEmpty() && lead.ConvertedContactId != null) {
            taskList = [SELECT Id, Subject, Status, ActivityDate, WhoId FROM Task WHERE WhoId = :lead.ConvertedContactId];
            System.debug('Task list size from Converted Contact ==> ' + taskList.size());
        }
        
        // If taskList is still empty, no tasks were found
        if (taskList.isEmpty()) {
            System.debug('No Tasks found for Lead ID: ' + lead.Id);
        }
        
        // Check if Lead is being converted
        if (oldLead.IsConverted == false && lead.IsConverted == true) {
            // Query EmailMessage count associated with the Lead
            Integer emailCount = [SELECT COUNT() FROM EmailMessage WHERE RelatedToId = :lead.Id];
            System.debug('Email Count ==> ' + emailCount);
            
            // If no email activity or tasks are logged, prevent conversion
            if (taskList.size() == 0 && emailCount == 0) {
                lead.addError('You cannot convert this Lead because no email or task activity is logged.');
            }
        }
    }
}