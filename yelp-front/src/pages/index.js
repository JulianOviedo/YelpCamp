import useLogInForm from '@/hooks/useLogInForm'

export default function LogIn () {
    const { handleSubmit, handleInputChange } = useLogInForm()

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="validated-form" noValidate>
                <div className="mb-3">
                    <label className="form-label" htmlFor="username">Username</label>
                    <input className="form-control" type="text" id="username" name="username" required onChange={handleInputChange}/>
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
                <button className="btn btn-success">Login</button>
            </form>
        </>
    )
}
