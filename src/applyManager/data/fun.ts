
export const testFun = (formState, data, type) => {
    const a = '1';
    console.log(formState.value, data.value.get('date'), type)
    return a;
}

export const testValidate = (form, val) => {

    console.log( form, val);


    return new Promise((resolve, reject) => {
        if (val) {
            resolve()
        } else {
            reject('请选择申请时间')
        }
    })
}

export const showDate = (formState, data, type) => {

    if (formState.value.name  == '1') {
        data.value.get('time').show = false;
    } else {
        data.value.get('time').show = true;
    }
}