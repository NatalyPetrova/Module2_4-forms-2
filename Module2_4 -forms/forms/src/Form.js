import { useState, useRef } from 'react';
import styles from '../src/Form.module.css';

const sendFormData = (formData) => {
	console.log(formData);
};

export const Form = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		repeatedPassword: '',
		emailError: null,
		passwordError: null,
		repeatedPasswordError: null,
	});

	const { email, password, repeatedPassword } = formData;

	const submitButtonRef = useRef(null);

	const validateEmail = (email) => {
		if (!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(email)) {
			return 'Неверный формат почты';
		} else {
			return;
		}
	};

	const validatePassword = (password) => {
		if (!/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/g.test(password)) {
			return 'Пароль должен содержать хотя бы одно число, спецсимвол, хотя бы одну латинскую букву в нижнем и верхнем регистрах';
		} else if (password.length < 8) {
			return 'Должно быть не менее 8 символов';
		}
	};

	const validateRepeatedPassword = (repeatedPassword) => {
		if (repeatedPassword !== formData.password) {
			return 'Пароли не совпадают!';
		} else {
			return;
		}
	};

	const onEmailChange = ({ target }) => {
		const newEmail = target.value;
		const emailError = validateEmail(newEmail);

		setFormData((formData) => ({
			...formData,
			email: newEmail,
			emailError,
		}));
	};

	const onPasswordChange = ({ target }) => {
		const newPassword = target.value;
		const passwordError = validatePassword(newPassword);

		setFormData((formData) => ({
			...formData,
			password: newPassword,
			passwordError,
		}));
	};

	const onRepeatedPasswordChange = ({ target }) => {
		const newRepeatedPassword = target.value;
		const repeatedPasswordError = validateRepeatedPassword(newRepeatedPassword);

		setFormData((formData) => ({
			...formData,
			repeatedPassword: newRepeatedPassword,
			repeatedPasswordError,
		}));
	};

	const onSubmit = (event) => {
		event.preventDefault();
		const emailError = validateEmail(email);
		const passwordError = validatePassword(password);
		const repeatedPasswordError = validateRepeatedPassword(repeatedPassword);

		setFormData((formData) => ({
			...formData,
			emailError,
			passwordError,
			repeatedPasswordError,
		}));

		if (!emailError && !passwordError && !repeatedPasswordError) {
			sendFormData(formData);
			submitButtonRef.current.focus();
		}
	};

	return (
		<div className={styles.form}>
			<form onSubmit={onSubmit}>
				{formData.emailError && (
					<div className={styles.errorLabel}>{formData.emailError}</div>
				)}
				{formData.passwordError && (
					<div className={styles.errorLabel}>{formData.passwordError}</div>
				)}
				{formData.repeatedPasswordError && (
					<div className={styles.errorLabel}>
						{formData.repeatedPasswordError}
					</div>
				)}
				<input
					name="email"
					type="email"
					placeholder="Почта"
					value={email}
					onChange={onEmailChange}
				/>
				<input
					name="password"
					type="password"
					placeholder="Пароль"
					value={password}
					onChange={onPasswordChange}
				/>
				<input
					name="repeatedPassword"
					type="password"
					placeholder="Повторите пароль"
					value={repeatedPassword}
					onChange={onRepeatedPasswordChange}
				/>
				<button
					type="submit"
					ref={submitButtonRef}
					disabled={
						!!formData.emailError ||
						!!formData.passwordError ||
						!!formData.repeatedPasswordError
					}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
