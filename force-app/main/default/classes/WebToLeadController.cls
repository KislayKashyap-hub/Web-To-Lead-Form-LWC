public class WebToLeadController {
    public List<Campaign> campaigns { get; set; }
    public String leadId { get; set; }  // Store the ID of the newly created Lead
    public String retURL { get; set; }

    public WebToLeadController() {
        // Fetch active campaigns
        campaigns = [SELECT Id, Name FROM Campaign WHERE IsActive = TRUE ORDER BY Name];

        // Query the most recently created Lead (if any)
        Lead latestLead = [SELECT Id FROM Lead ORDER BY CreatedDate DESC LIMIT 1];

        // Set the Lead ID and the retURL to redirect to the newly created Lead's page
        leadId = latestLead.Id;
        retURL = '/apex/redirectWebToLead?id=' + leadId;
    }
}