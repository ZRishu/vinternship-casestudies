import { Component, type ErrorInfo, type ReactNode } from 'react'

type ErrorBoundaryProps = {
  children: ReactNode
  title: string
  message: string
  onRetry?: () => void
}

type ErrorBoundaryState = {
  hasError: boolean
  errorMessage: string
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
    errorMessage: '',
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error.message,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Lazy loading error caught by boundary', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      errorMessage: '',
    })
    this.props.onRetry?.()
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="error-box" role="alert">
          <strong>{this.props.title}</strong>
          <p>{this.props.message}</p>
          <small>{this.state.errorMessage}</small>
          <button type="button" className="button button--danger" onClick={this.handleRetry}>
            Retry load
          </button>
        </section>
      )
    }

    return this.props.children
  }
}
