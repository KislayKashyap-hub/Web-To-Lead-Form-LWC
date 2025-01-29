import { LightningElement, track } from 'lwc';
import createLead from '@salesforce/apex/LeadController.createLead';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class LeadForm extends NavigationMixin(LightningElement) {
    @track firstName = '';
    @track lastName = '';
    @track email = '';
    @track company = '';
    @track city = '';
    @track state = '';
    @track productInterest = '';
    @track leadSource = '';
    
    productInterestOptions = [
        { label: 'Electronics', value: 'Electronics' },
        { label: 'Fashion', value: 'Fashion' },
        { label: 'Home & Furniture', value: 'HomeFurniture' },
        { label: 'Books', value: 'Books' },
        { label: 'Beauty & Personal Care', value: 'Beauty' }
    ];

    leadSourceOptions = [
        { label: 'Web', value: 'Web' },
        { label: 'Referral', value: 'Referral' },
        { label: 'Social Media', value: 'SocialMedia' },
        { label: 'Email Campaign', value: 'EmailCampaign' },
        { label: 'Advertisement', value: 'Advertisement' }
    ];

    handleChange(event) {
        this[event.target.name] = event.target.value;
    }

    handleSubmit() {
        const inputs = this.template.querySelectorAll('lightning-input, lightning-combobox');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.checkValidity()) {
                input.reportValidity();
                isValid = false;
            }
        });

        if (!isValid) {
            this.dispatchEvent(new ShowToastEvent({
                title: '⚠️ Missing Fields',
                message: 'Please fill in all required fields.',
                variant: 'error'
            }));
            return;
        }

        createLead({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            company: this.company,
            city: this.city,
            state: this.state,
            productInterest: this.productInterest,
            leadSource: this.leadSource
        })
        .then(leadId => {
            this.dispatchEvent(new ShowToastEvent({
                title: '🎉 Success!',
                message: 'Lead created successfully!',
                variant: 'success'
            }));

            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: leadId,
                    objectApiName: 'Lead',
                    actionName: 'view'
                }
            });
        })
        .catch(error => {
            this.dispatchEvent(new ShowToastEvent({
                title: '⚠️ Error',
                message: error.body.message,
                variant: 'error'
            }));
        });
    }
}