
export const testFun = (formState, data, type) => {
    const a = '1';
    console.log(formState.value, data.value.get('date'), type)
    return a;
}

export const testValidate = async ( data) => {
    const {formState, refs} = data;
    //console.log(await refs[0].validateFields('time'));
    return new Promise((resolve, reject) => {
        if (formState.name !== 'test') {
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