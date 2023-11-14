
import { SUPPORTED_LANGUAGES } from '../constants';
import { type FromLanguage, type Language } from '../types.d';


import { OpenAI } from "openai";
const openai = new OpenAI({ apiKey: process.env.VITE_OPENAI_API_KEY });




export async function translate ({
    fromLanguage,
    toLanguage,
    text
}:{
    fromLanguage : FromLanguage
    toLanguage : Language
    text: string
}) {
    const messages = [
        {
            role: 'system',
            content: 'Hola mundo {{Español}} {{English}}'
        },
        {
            role: 'assistant',
            content: 'Hello world'
        },
        {
            role: 'user',
            content: 'How are you? {{auto}} [[Deutsch]]'
        },
        {
            role: 'assitant',
            content: 'Wie geht es dir?'
        },
        {
            role: 'user',
            content: 'Bon dia, com estas? {{auto}} [[Español]]'
        },
        {
            role: 'assistant',
            content: 'Buenos días, ¿Cómo estás?'
        }
    ]
    const fromCode = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]
    const toCode = SUPPORTED_LANGUAGES[toLanguage]

    const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            ...messages,
            {
                role: 'user',
                content: `${text} {{${fromCode}}} [[${toCode}]]`
            }
        ]
    })

    return completion.data.choices[0]?.message?.content
}



//porque mi estado no esta cambiando de Traducir texto a Cargando...?