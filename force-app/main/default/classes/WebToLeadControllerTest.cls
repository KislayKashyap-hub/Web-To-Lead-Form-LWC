@isTest
public class WebToLeadControllerTest {

    @isTest
    public static void testWebToLeadController() {
        // Create a test Campaign
        Campaign testCampaign = new Campaign(Name = 'Test Campaign', IsActive = TRUE);
        insert testCampaign;

        // Create a test Lead
        Lead testLead = new Lead(FirstName = 'John', LastName = 'Doe', Company = 'Test Company');
        insert testLead;

        // Start a test context
        Test.startTest();

        // Instantiate the WebToLeadController
        WebToLeadController controller = new WebToLeadController();

        // Verify that the controller fetches the active campaigns
        System.assertNotEquals(controller.campaigns, null, 'Campaign list should not be null');
        System.assertEquals(controller.campaigns.size(), 1, 'Should have one active campaign');
        System.assertEquals(controller.campaigns[0].Id, testCampaign.Id, 'The campaign ID should match the inserted campaign');

        // Verify that the leadId is correctly populated
        System.assertNotEquals(controller.leadId, null, 'Lead ID should not be null');
        System.assertEquals(controller.leadId, testLead.Id, 'Lead ID should match the inserted lead');

        // Verify that the retURL is correctly populated
        System.assertNotEquals(controller.retURL, null, 'retURL should not be null');
        System.assert(controller.retURL.contains('id=' + testLead.Id), 'retURL should contain the lead ID');

        // End the test context
        Test.stopTest();
    }
}