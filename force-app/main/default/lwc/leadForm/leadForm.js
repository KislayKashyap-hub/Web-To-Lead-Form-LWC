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

    stateOptions = [
        { label: 'Andhra Pradesh', value: 'Andhra Pradesh' },
        { label: 'Arunachal Pradesh', value: 'Arunachal Pradesh' },
        { label: 'Assam', value: 'Assam' },
        { label: 'Bihar', value: 'Bihar' },
        { label: 'Chhattisgarh', value: 'Chhattisgarh' },
        { label: 'Goa', value: 'Goa' },
        { label: 'Gujarat', value: 'Gujarat' },
        { label: 'Haryana', value: 'Haryana' },
        { label: 'Himachal Pradesh', value: 'Himachal Pradesh' },
        { label: 'Jharkhand', value: 'Jharkhand' },
        { label: 'Karnataka', value: 'Karnataka' },
        { label: 'Kerala', value: 'Kerala' },
        { label: 'Madhya Pradesh', value: 'Madhya Pradesh' },
        { label: 'Maharashtra', value: 'Maharashtra' },
        { label: 'Manipur', value: 'Manipur' },
        { label: 'Meghalaya', value: 'Meghalaya' },
        { label: 'Mizoram', value: 'Mizoram' },
        { label: 'Nagaland', value: 'Nagaland' },
        { label: 'Odisha', value: 'Odisha' },
        { label: 'Punjab', value: 'Punjab' },
        { label: 'Rajasthan', value: 'Rajasthan' },
        { label: 'Sikkim', value: 'Sikkim' },
        { label: 'Tamil Nadu', value: 'Tamil Nadu' },
        { label: 'Telangana', value: 'Telangana' },
        { label: 'Tripura', value: 'Tripura' },
        { label: 'Uttarakhand', value: 'Uttarakhand' },
        { label: 'Uttar Pradesh', value: 'Uttar Pradesh' },
        { label: 'West Bengal', value: 'West Bengal' }
    ];

    cityOptions = {
        'Andhra Pradesh': [
            { label: 'Visakhapatnam', value: 'Visakhapatnam' },
            { label: 'Vijayawada', value: 'Vijayawada' },
            { label: 'Guntur', value: 'Guntur' },
            { label: 'Nellore', value: 'Nellore' },
            { label: 'Tirupati', value: 'Tirupati' }
        ],
        'Arunachal Pradesh': [
            { label: 'Itanagar', value: 'Itanagar' },
            { label: 'Tawang', value: 'Tawang' },
            { label: 'Ziro', value: 'Ziro' },
            { label: 'Pasighat', value: 'Pasighat' },
            { label: 'Tezu', value: 'Tezu' }
        ],
        'Assam': [
            { label: 'Guwahati', value: 'Guwahati' },
            { label: 'Dibrugarh', value: 'Dibrugarh' },
            { label: 'Silchar', value: 'Silchar' },
            { label: 'Jorhat', value: 'Jorhat' },
            { label: 'Tinsukia', value: 'Tinsukia' }
        ],
        'Bihar': [
            { label: 'Patna', value: 'Patna' },
            { label: 'Gaya', value: 'Gaya' },
            { label: 'Bhagalpur', value: 'Bhagalpur' },
            { label: 'Muzaffarpur', value: 'Muzaffarpur' },
            { label: 'Munger', value: 'Munger' }
        ],
        'Chhattisgarh': [
            { label: 'Raipur', value: 'Raipur' },
            { label: 'Bilaspur', value: 'Bilaspur' },
            { label: 'Durg', value: 'Durg' },
            { label: 'Korba', value: 'Korba' },
            { label: 'Rajnandgaon', value: 'Rajnandgaon' }
        ],
        'Goa': [
            { label: 'Panaji', value: 'Panaji' },
            { label: 'Margao', value: 'Margao' },
            { label: 'Vasco da Gama', value: 'Vasco da Gama' },
            { label: 'Mapusa', value: 'Mapusa' },
            { label: 'Ponda', value: 'Ponda' }
        ],
        'Gujarat': [
            { label: 'Ahmedabad', value: 'Ahmedabad' },
            { label: 'Surat', value: 'Surat' },
            { label: 'Vadodara', value: 'Vadodara' },
            { label: 'Rajkot', value: 'Rajkot' },
            { label: 'Gandhinagar', value: 'Gandhinagar' }
        ],
        'Haryana': [
            { label: 'Gurugram', value: 'Gurugram' },
            { label: 'Faridabad', value: 'Faridabad' },
            { label: 'Ambala', value: 'Ambala' },
            { label: 'Panipat', value: 'Panipat' },
            { label: 'Hisar', value: 'Hisar' }
        ],
        'Himachal Pradesh': [
            { label: 'Shimla', value: 'Shimla' },
            { label: 'Manali', value: 'Manali' },
            { label: 'Dharamsala', value: 'Dharamsala' },
            { label: 'Kullu', value: 'Kullu' },
            { label: 'Kangra', value: 'Kangra' }
        ],
        'Jharkhand': [
            { label: 'Ranchi', value: 'Ranchi' },
            { label: 'Jamshedpur', value: 'Jamshedpur' },
            { label: 'Dhanbad', value: 'Dhanbad' },
            { label: 'Bokaro', value: 'Bokaro' },
            { label: 'Deoghar', value: 'Deoghar' }
        ],
        'Karnataka': [
            { label: 'Bengaluru', value: 'Bengaluru' },
            { label: 'Mysuru', value: 'Mysuru' },
            { label: 'Hubballi', value: 'Hubballi' },
            { label: 'Mangaluru', value: 'Mangaluru' },
            { label: 'Belagavi', value: 'Belagavi' }
        ],
        'Kerala': [
            { label: 'Thiruvananthapuram', value: 'Thiruvananthapuram' },
            { label: 'Kochi', value: 'Kochi' },
            { label: 'Kozhikode', value: 'Kozhikode' },
            { label: 'Kottayam', value: 'Kottayam' },
            { label: 'Thrissur', value: 'Thrissur' }
        ],
        'Madhya Pradesh': [
            { label: 'Bhopal', value: 'Bhopal' },
            { label: 'Indore', value: 'Indore' },
            { label: 'Gwalior', value: 'Gwalior' },
            { label: 'Ujjain', value: 'Ujjain' },
            { label: 'Jabalpur', value: 'Jabalpur' }
        ],
        'Maharashtra': [
            { label: 'Mumbai', value: 'Mumbai' },
            { label: 'Pune', value: 'Pune' },
            { label: 'Nagpur', value: 'Nagpur' },
            { label: 'Nashik', value: 'Nashik' },
            { label: 'Aurangabad', value: 'Aurangabad' }
        ],
        'Manipur': [
            { label: 'Imphal', value: 'Imphal' },
            { label: 'Churachandpur', value: 'Churachandpur' },
            { label: 'Thoubal', value: 'Thoubal' },
            { label: 'Kangpokpi', value: 'Kangpokpi' },
            { label: 'Senapati', value: 'Senapati' }
        ],
        'Meghalaya': [
            { label: 'Shillong', value: 'Shillong' },
            { label: 'Tura', value: 'Tura' },
            { label: 'Jowai', value: 'Jowai' },
            { label: 'Nongstoin', value: 'Nongstoin' },
            { label: 'Mawkyrwat', value: 'Mawkyrwat' }
        ],
        'Mizoram': [
            { label: 'Aizawl', value: 'Aizawl' },
            { label: 'Lunglei', value: 'Lunglei' },
            { label: 'Champhai', value: 'Champhai' },
            { label: 'Serchhip', value: 'Serchhip' },
            { label: 'Kolasib', value: 'Kolasib' }
        ],
        'Nagaland': [
            { label: 'Kohima', value: 'Kohima' },
            { label: 'Dimapur', value: 'Dimapur' },
            { label: 'Mokokchung', value: 'Mokokchung' },
            { label: 'Wokha', value: 'Wokha' },
            { label: 'Zunheboto', value: 'Zunheboto' }
        ],
        'Odisha': [
            { label: 'Bhubaneswar', value: 'Bhubaneswar' },
            { label: 'Cuttack', value: 'Cuttack' },
            { label: 'Rourkela', value: 'Rourkela' },
            { label: 'Puri', value: 'Puri' },
            { label: 'Sambalpur', value: 'Sambalpur' }
        ],
        'Punjab': [
            { label: 'Chandigarh', value: 'Chandigarh' },
            { label: 'Amritsar', value: 'Amritsar' },
            { label: 'Ludhiana', value: 'Ludhiana' },
            { label: 'Jalandhar', value: 'Jalandhar' },
            { label: 'Patiala', value: 'Patiala' }
        ],
        'Rajasthan': [
            { label: 'Jaipur', value: 'Jaipur' },
            { label: 'Udaipur', value: 'Udaipur' },
            { label: 'Jodhpur', value: 'Jodhpur' },
            { label: 'Kota', value: 'Kota' },
            { label: 'Ajmer', value: 'Ajmer' }
        ],
        'Sikkim': [
            { label: 'Gangtok', value: 'Gangtok' },
            { label: 'Namchi', value: 'Namchi' },
            { label: 'Mangan', value: 'Mangan' },
            { label: 'Jorethang', value: 'Jorethang' },
            { label: 'Rangpo', value: 'Rangpo' }
        ],
        'Tamil Nadu': [
            { label: 'Chennai', value: 'Chennai' },
            { label: 'Coimbatore', value: 'Coimbatore' },
            { label: 'Madurai', value: 'Madurai' },
            { label: 'Trichy', value: 'Trichy' },
            { label: 'Salem', value: 'Salem' }
        ],
        'Telangana': [
            { label: 'Hyderabad', value: 'Hyderabad' },
            { label: 'Warangal', value: 'Warangal' },
            { label: 'Khammam', value: 'Khammam' },
            { label: 'Nizamabad', value: 'Nizamabad' },
            { label: 'Karimnagar', value: 'Karimnagar' }
        ],
        'Tripura': [
            { label: 'Agartala', value: 'Agartala' },
            { label: 'Udaipur', value: 'Udaipur' },
            { label: 'Kailashahar', value: 'Kailashahar' },
            { label: 'Belonia', value: 'Belonia' },
            { label: 'Ambassa', value: 'Ambassa' }
        ],
        'Uttar Pradesh': [
            { label: 'Lucknow', value: 'Lucknow' },
            { label: 'Kanpur', value: 'Kanpur' },
            { label: 'Agra', value: 'Agra' },
            { label: 'Varanasi', value: 'Varanasi' },
            { label: 'Prayagraj', value: 'Prayagraj' }
        ],
        'Uttarakhand': [
            { label: 'Dehradun', value: 'Dehradun' },
            { label: 'Haridwar', value: 'Haridwar' },
            { label: 'Nainital', value: 'Nainital' },
            { label: 'Rishikesh', value: 'Rishikesh' },
            { label: 'Haldwani', value: 'Haldwani' }
        ],
        'West Bengal': [
            { label: 'Kolkata', value: 'Kolkata' },
            { label: 'Siliguri', value: 'Siliguri' },
            { label: 'Durgapur', value: 'Durgapur' },
            { label: 'Howrah', value: 'Howrah' },
            { label: 'Asansol', value: 'Asansol' }
        ]
    };

    handleChange(event) {
        if (event.target.name === 'state') {
            this.city = ''; // Clear selected city when state changes
        }
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

    get cityOptionsForSelectedState() {
        return this.cityOptions[this.state] || [];
    }
}
