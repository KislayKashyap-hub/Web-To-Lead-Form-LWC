trigger LeadAssignmentAndCampaignTrigger on Lead (before insert, after insert) {
    // List to hold the CampaignMember records
    List<CampaignMember> members = new List<CampaignMember>();

    // Handle Owner Assignment in the before insert section
    if (Trigger.isBefore) {
        for (Lead l : Trigger.new) {
            // Lead assignment based on State/Province
            if (l.State == 'Maharashtra' || l.State == 'Goa' || l.State == 'Gujarat' || l.State == 'Madhya Pradesh' || l.State == 'Rajasthan') {
                l.OwnerId = '005NS00000DqU5lYAF'; // Kislay Kumar
            } else if (l.State == 'Bihar' || l.State == 'West Bengal' || l.State == 'Karnataka' || l.State == 'Odisha' || l.State == 'Assam') {
                l.OwnerId = '005NS00000GFWrBYAX'; // Sale Manager
            }
        }
    }

    // Handle Campaign Member insertion in the after insert section
    if (Trigger.isAfter) {
        // Define campaign ID from label
        String campaignId = Label.Indian_sale; // Replace with your label name

        for (Lead lead : Trigger.new) {
            // Create CampaignMember for each lead
            members.add(new CampaignMember(
                LeadId = lead.Id,
                CampaignId = campaignId
            ));
        }

        // Insert CampaignMember records in bulk
        try {
            insert members;
        } catch (DmlException e) {
            // Handle DML errors if any occur
            System.debug('Error inserting Campaign Members: ' + e.getMessage());
        }
    }
}