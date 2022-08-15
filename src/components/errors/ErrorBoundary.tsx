import { Component, Fragment } from 'react';
import { IoReloadCircle } from 'react-icons/io5';
import { MdSignalWifiOff } from 'react-icons/md';

class ErrorBoundary extends Component {
  constructor(props: any) {
    super(props);

    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({
      hasError: true,
      error,
      errorInfo,
    });

    console.log('Error: ', error);
    console.log('ErrorInfo: ', errorInfo);
  }

  render() {
    if ((this.state as any).hasError) {
      return (
        <Fragment>
          <div className="pd-30 grid justify-content-center h-100 wf-100">
            <div className="snackbar wf-100">
              <div className="snackbar__body pdy-4">
                <h5 className="mg-0 mgb-2 fs-22">
                  Oops, Something Went Wrong!
                </h5>
                <div className="d-flex mgt-20">
                  <MdSignalWifiOff className="mgr-2 text-danger" size={20} />
                  <h6 className="m-0 mgb-3 fs-16">
                    Please check your internet connection!
                  </h6>
                </div>

                <div className="d-flex justify-content-center w-100">
                  <button
                    onClick={() => window.location.reload()}
                    type="button"
                    className="btn btn-teal h-auto pdy-14 pdx-28 round-20 d-flex align-items-center mgt-10"
                  >
                    <IoReloadCircle size={20} className="mgr-2" />
                    Try again?
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      );
    }
    return this.props.children;
  }
}

export { ErrorBoundary as default };