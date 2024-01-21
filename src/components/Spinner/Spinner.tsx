const colors = {
  white: {
    div: 'inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-white motion-reduce:animate-[spin_1.5s_linear_infinite]',
    span: '!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'
  },
  blue: {
    div: 'inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-blue motion-reduce:animate-[spin_1.5s_linear_infinite]',
    span: '!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'
  },
  green: {
    div: 'inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-green motion-reduce:animate-[spin_1.5s_linear_infinite]',
    span: '!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'
  },
  red: {
    div: 'inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-red motion-reduce:animate-[spin_1.5s_linear_infinite]',
    span: '!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'
  },
  black: {
    div: 'inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-black motion-reduce:animate-[spin_1.5s_linear_infinite]',
    span: '!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'
  },
  orange: {
    div: 'inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-orange motion-reduce:animate-[spin_1.5s_linear_infinite]',
    span: '!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'
  },
  purple: {
    div: 'inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-purple motion-reduce:animate-[spin_1.5s_linear_infinite]',
    span: '!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'
  }
} as const;

export type SpinnerColor = keyof typeof colors;

interface SpinnerProps {
  color: SpinnerColor;
}

export function Spinner(spinnerProps: SpinnerProps) {
  return (
    <div className={colors[spinnerProps.color].div} role="status">
      <span className={colors[spinnerProps.color].span}>Loading...</span>
    </div>
  );
}
