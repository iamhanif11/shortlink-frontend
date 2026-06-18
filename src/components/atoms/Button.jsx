

const Button = ({
  children,
  type = 'button',
  variant = 'primary', 
  size = 'md',         
  rounded = 'md',      
  className = '',      
  disabled = false,
  onClick,
  ...props
}) => {
  
  
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white border-transparent',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white border-transparent',
    danger: 'bg-red-600 hover:bg-red-700 text-white border-transparent',
    outline: 'bg-transparent border-blue-600 text-blue-600 hover:bg-blue-50',
    custom: '', 
  };

  
  const sizes = {
    sm: 'px-3 py-1.5 text-xs font-medium tracking-wide',
    md: 'px-5 py-2.5 text-sm font-semibold tracking-wide',
    lg: 'px-8 py-3.5 text-base font-bold tracking-wide',
  };

  
  const roundness = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-xl',
    full: 'rounded-full',
  };

  
  const baseStyle = 'inline-flex items-center justify-center border font-sans transition-all duration-200 active:scale-95 focus:outline-none';
  const disabledStyle = 'opacity-50 cursor-not-allowed active:scale-100';

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        ${baseStyle}
        ${variants[variant]}
        ${sizes[size]}
        ${roundness[rounded]}
        ${disabled ? disabledStyle : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;