export default function Input({name,placeholder,handleInput}){
    return (
        <>
        <input 
        name={name}
        className="input-field" 
        type="text" 
        placeholder={placeholder} 
        onChange={handleInput}
        
        />
        </>
    )
}