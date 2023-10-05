import './MessageComponent.css';

type MessageComponentProps = {
        message: string
        hasError: boolean
}

export default function MessageComponent (props: MessageComponentProps) {
    const className = props.hasError ? 'errorMessage' : 'message';
    return <h5 className={className}>{props.message}</h5>
}