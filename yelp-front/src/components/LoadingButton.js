export default function LoadingButton ({ value }) {
    return (
        <button className="btn btn-primary mb-3" type="button" disabled>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            {value}
        </button>
    )
}
