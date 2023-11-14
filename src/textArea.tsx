import {Form} from 'react-bootstrap'
import { SectionType} from './types.d'

interface Props {
    type: SectionType,
    loading?: boolean,
    onChange: ((value:string)=>void),
    value: string,
}

const getPlaceHolder = ({type, loading}:{type: SectionType, loading ?: boolean})=>{
    if(type === SectionType.From) return 'Introducir texto'
    if(loading === true) return 'Cargando...'
    return 'Traducción'
}


export const TextArea = ({type, loading, onChange, value}: Props)=>{
    const handledChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>{
        
        onChange(event.target.value)
    }
    return(
        <Form.Control
        autoFocus={type===SectionType.From}
        as='textarea'
        disabled={type===SectionType.To === true}
        placeholder= {getPlaceHolder({type, loading})}
        value={value}
        onChange ={handledChange}

        />
    )
}