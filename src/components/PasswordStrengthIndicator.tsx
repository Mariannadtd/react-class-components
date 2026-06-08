import { getPasswordStrength } from '../utils/formUtils';

type PasswordStrengthIndicatorProps = {
  password: string;
};

export const PasswordStrengthIndicator = ({ password }: PasswordStrengthIndicatorProps) => {
  const strength = getPasswordStrength(password);

  const checks = [
    { label: '1 number', passed: strength.hasNumber },
    { label: '1 uppercase', passed: strength.hasUppercase },
    { label: '1 lowercase', passed: strength.hasLowercase },
    { label: '1 special character', passed: strength.hasSpecialCharacter },
  ];

  return (
    <ul className="password-strength" aria-label="Password strength">
      {checks.map((check) => (
        <li className={check.passed ? 'passed' : ''} key={check.label}>
          {check.passed ? 'OK' : '--'} {check.label}
        </li>
      ))}
    </ul>
  );
};
