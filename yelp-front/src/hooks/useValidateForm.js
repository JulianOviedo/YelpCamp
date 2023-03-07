import { useState, useEffect, useRef } from 'react'

export default function useFormValidation() {
    const formRef = useRef(null)
    const [isValidated, setIsValidated] = useState(false)

    useEffect(() => {
        const form = formRef.current

        // Check if form exists
        if (form) {
            // Prevent submission
            const handleFormSubmit = (event) => {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                setIsValidated(true)
            }

            form.addEventListener('submit', handleFormSubmit, false)
        }

        return () => {
            if (form) {
                const handleFormSubmit = (event) => {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
                    setIsValidated(true)
                }

                form.removeEventListener('submit', handleFormSubmit, false)
            }
        }
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()

        setIsValidated(true)
    }

    return [formRef, isValidated, handleSubmit]
}
