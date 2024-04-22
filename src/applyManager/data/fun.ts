
export const testFun = (formState, data, type) => {
    const a = '1';
    console.log(formState.value, data.value.get('date'), type)
    return a;
}