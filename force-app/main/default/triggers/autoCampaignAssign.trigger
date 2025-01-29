trigger autoCampaignAssign on Lead (after insert) 
{
   String campaignId = Label.CampaignId; // Replace with your label name
    List<CampaignMember> members = new List<CampaignMember>();
 
    for (Lead lead : Trigger.new) {
        members.add(new CampaignMember(
            LeadId = lead.Id,
            CampaignId = campaignId
        ));
    }
    insert members;
}