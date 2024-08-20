
export const testFun = (formState, data, type) => {
    const a = '1';
    console.log(formState.value, data.value.get('date'), type)
    return a;
}
export const testDate = (formState, data, type) =>{
    console.log(formState, data, type);
    formState.value.startDate = formState.value['date'][0];
    formState.value.endDate = formState.value['date'][1];
}
export const testValidate = async ( data) => {
    const {cardForm} = data.validatorData;
    console.log(data.validatorData.cardForm);
    //console.log(await refs[0].validateFields('time'));
    return new Promise((resolve, reject) => {
        if (cardForm.formState.describe !== 'test') {
            resolve()
        } else {
            reject('不能输入test')
        }
    })
}

export const testTableOption = (item, currentItem, data) => {
    console.log(item, currentItem, data);
}


export const showDate = (formState, data, type) => {

    if (formState.value.name  == '1') {
        data.value.get('time').show = false;
    } else {
        data.value.get('time').show = true;
    }
}