
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
    const {cardForm, refs} = data;
    console.log(cardForm.value,refs );
    return new Promise((resolve, reject) => {
        if (cardForm.value.formState.describe !== 'test') {
            resolve()
        } else {
            reject('不能输入test')
        }
    })
}

export const validateStartTime = async  (anyData: Object) => {
    const { cardForm,  refs } = anyData;

    console.log('formRef', refs.value.validateFields);
    console.log('value', cardForm.value);

    if (cardForm.value.formState?.date !='') {
        console.log(cardForm.value.formState?.date);
       setTimeout(async () => {
           const res = await refs.value.validateFields(['year']);
           console.log(res);
       }, 100);
    } else {
        return Promise.reject('date不能为空')
    }
    // return Promise.resolve();
    // if (endTime && startTime > endTime) {
    //   console.log(startTime, endTime);
    //   return Promise.reject('开始时间不能大于结束时间');
    // }
    // if (endTime && startTime === endTime) {
    //   console.log(startTime, endTime);
    //   return Promise.reject('开始时间不能等于结束时间');
    // }
    return Promise.resolve();

};

export const validateYear = async (anyData: Object) => {
    const { cardForm,  refs } = anyData;
    if (cardForm.value.formState?.date !='' && cardForm.value.formState?.year =='') {
            return Promise.reject('date不为空时year不能为空');

    } else{

        return Promise.resolve();
    }


}

export const validateEndTime = async (anyData: Object) => {
    const { cardForm } = anyData;
    console.log(anyData);
    let startTime = cardForm.value.formState?.startTime;
    let endTime = cardForm.value.formState?.endTime;

    if (!endTime) {
        return Promise.resolve();
    }
    if (startTime && startTime > endTime) {
        console.log(startTime, endTime);
        return Promise.reject('开始时间不能大于结束时间');
    }
    if (startTime && startTime === endTime) {
        console.log(startTime, endTime);
        return Promise.reject('开始时间不能等于结束时间');
    }
    return Promise.resolve();

};


export const testSlot = (data) => {
    console.log(data, 23);
      return Promise.resolve();
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