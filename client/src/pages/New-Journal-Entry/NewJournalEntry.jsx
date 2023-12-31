import { useContext, useState } from 'react';
import PageComponent from '../../components/page-component/PageComponent';
import Secondaryheader from '../../components/secondary-header/SecondaryHeader';
import { AuthContext } from '../../context/Auth.context';
import PageContainer from '../../components/page-container/PageContainer';
import { useForm } from 'react-hook-form';
import { useFetch } from '../../hooks/useFetch';
import { FORM_VALIDATIONS } from '../../constants/formValidations';
import { METHODS } from '../../constants/methods';
import { HEADERS } from '../../constants/headers';
import { JOURNAL_URLS } from '../../constants/urls';
import Text from '../../components/text/Text';
import { MEASUREMENTS } from '../../constants/measurements';
import InputContainer from '../../components/InputContainer/InputContainer';
import { StyledForm, StyledTexboxInput } from './styles';
import SecondaryButton from '../../components/secondary-button/SecondaryButton';
import { COLORS } from '../../constants/colors';

import AddImageContainer from '../../components/add-image-container/AddImageContainer';

const NewJournalEntry = () => {
	const { currentUser } = useContext(AuthContext);
	const currentDate = Date.now();
	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm({ mode: 'onBlur' });

	const { setFetchInfo } = useFetch();
	const [imgs, setImgs] = useState([]);
	return (
		<PageComponent>
			<Secondaryheader url={'/journal'} />
			<PageContainer>
				<AddImageContainer
					currentUser={currentUser}
					imgs={imgs}
					setImgs={setImgs}
				/>
				<StyledForm
					onSubmit={handleSubmit((formData, e) =>
						onSubmit(formData, e, setFetchInfo, currentUser, currentDate, imgs)
					)}
				>
					<InputContainer
						errors={errors}
						keyForm={'journalEntryTitle'}
						label={'Title'}
						register={register}
						type={'text'}
					/>
					<Text
						text={`Date: ${new Date(currentDate).toLocaleDateString()}`}
						align={MEASUREMENTS.ALIGN.CENTER}
						fontSize={MEASUREMENTS.FONTS_SIZE.KEY.SUBTITLE}
					/>

					<StyledTexboxInput
						name='journalEntryText'
						{...register('journalEntryText', FORM_VALIDATIONS.journalEntry)}
						placeholder='Write your entry here'
					/>
					<p>{errors?.text?.message}</p>

					<SecondaryButton
						align={MEASUREMENTS.ALIGN.CENTER}
						color={COLORS.MAIN}
						text={'Accept'}
					/>
				</StyledForm>
			</PageContainer>
		</PageComponent>
	);
};

const onSubmit = async (
	formData,
	e,
	setFetchInfo,
	currentUser,
	currentDate,
	imgs
) => {
	e.preventDefault();
	const { journalEntryTitle, journalEntryText } = formData;
	const defaultTitle = 'Entry 0';
	try {
		await setFetchInfo({
			url: JOURNAL_URLS.CREATE_ENTRY + currentUser._id,
			options: {
				method: METHODS.POST,
				body: JSON.stringify({
					userId: currentUser._id,
					journalEntryTitle: !journalEntryTitle
						? defaultTitle
						: journalEntryTitle,
					journalEntryCreation: currentDate,
					journalEntryText,
					journalEntryEdited: currentDate,
					journalEntryImgs: imgs
				}),
				headers: HEADERS
			},
			navigateTo: `/journal`
		});
	} catch (error) {
		console.log(error);
	}
};

export default NewJournalEntry;
