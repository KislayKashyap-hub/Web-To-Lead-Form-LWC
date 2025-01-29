public with sharing class LeadController {
    @AuraEnabled
    public static Id createLead(String firstName, String lastName, String email, 
                                String company, String city, String state, 
                                String leadSource) {
        try {
            // Create a new Lead
            Lead newLead = new Lead(
                FirstName = firstName,
                LastName = lastName,
                Email = email,
                Company = company,
                City = city,
                State = state,
                LeadSource = leadSource,
                Status = 'Open - Not Contacted'
            );

            // Insert the new lead (trigger will handle the rest)
            insert newLead;

            // Return the Lead ID
            return newLead.Id;
        } catch (Exception e) {
            // Handle errors by throwing an AuraHandledException
            throw new AuraHandledException(e.getMessage());
        }
    }
}