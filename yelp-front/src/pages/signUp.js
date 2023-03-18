import useSignUpForm from '@/hooks/useSignUpForm'
import useFormValidation from '@/hooks/useValidateForm'

export default function SignUp () {
    const { handleSubmit, handleInputChange } = useSignUpForm()
    const [formRef, isValidated] = useFormValidation()

    return (
        <>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit} ref={formRef} noValidate className={isValidated ? 'was-validated' : 'form-validate'}>
                <div className="mb-3">
                    <label className="form-label" htmlFor="username">Username</label>
                    <input className="form-control" type="text" id="username" name="username" required onChange={handleInputChange}/>
                    <div className="valid-feedback">
            Looks good!
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input className="form-control" type="email" id="email" name="email" required onChange={handleInputChange}/>
                    <div className="valid-feedback">
            Looks good!
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input className="form-control" type="password" id="password" name="password" required onChange={handleInputChange}/>
                    <div className="valid-feedback">
            Looks good!
                    </div>
                </div>
                <button className="btn btn-success">Sign Up</button>
            </form>
        </>
    )
}
