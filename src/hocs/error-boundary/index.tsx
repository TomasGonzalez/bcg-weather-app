import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button, View } from 'react-native';
import Text from 'src/components/text';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo); //Send it to sentry or something
  }

  resetError = () => {
    this.setState({ hasError: false });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <View
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>
            Sorry.. there was an error.
            {'\n'} Our team is working on it.
          </Text>
          <Button onPress={this.resetError} title={'Try again'} />
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
