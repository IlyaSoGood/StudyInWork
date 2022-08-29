const form = {
    // check: $('[data-role="form-check"]'),
    // cookie: App.getCookie("firstEnterPage"),
    // main: $('[data-role="form"]'),
    mask: new Inputmask({
        mask: "+7 (999) 999-99-99",
        showMaskOnHover: false,
        clearIncomplete: false,
    }),
    phone: $('input[name=phone]'),
};


export default function initModal() 
{ 
 //Module code goes here 
    if (form.phone.length > 0){
        form.mask.mask(form.phone);
    }
}