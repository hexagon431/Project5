export function displayClassName(target: Function){
    console.log(target.name);
}

export function displayClassNameWithPurpose(purpose: string){
    return (target: Function) => {
        console.log(`Class name: ${target.name}, purpose: ${purpose}`)
    }
}