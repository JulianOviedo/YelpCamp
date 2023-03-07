function Error({ statusCode, message, stack }) {
    return (
        <div className="row">
            <div className="col-6 offset-3">
                <div className="alert alert-danger" role="alert">
                    {statusCode === 'undefined'
                        ? <h4>Error</h4>
                        : <h4 className="alert-heading">{`Error status code ${statusCode}`}</h4>
                    }
                    <p>{message}</p>
                    <h4>Stack (delete on production)</h4>
                    <p>{stack}</p>
                </div>
            </div>
        </div>
    )
}

Error.getInitialProps = ({ query }) => {
    const { statusCode, message, stack } = query
    return { statusCode, message, stack }
}

export default Error
