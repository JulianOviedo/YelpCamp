export default function LogIn () {
    return (
        <>
            <h1>Login</h1>
            <form action="/login" method="POST" className="validated-form" noValidate>
                <div className="mb-3">
                    <label className="form-label" htmlFor="username">Username</label>
                    <input className="form-control" type="text" id="username" name="username" required/>
                    <div className="valid-feedback">
            Looks good!
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input className="form-control" type="password" id="password" name="password" required/>
                    <div className="valid-feedback">
            Looks good!
                    </div>
                </div>
                <button className="btn btn-success">Login</button>
            </form>
        </>
    )
}
