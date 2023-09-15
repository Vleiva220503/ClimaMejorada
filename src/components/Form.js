import { useTranslation } from "react-i18next";
import {
  Box,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import useForm from "../hooks/useForm";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = ({ newLocation }) => {
  const { t } = useTranslation("global");

  const { value: city, handleChange, reset } = useForm("");

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (!city.trim()) {
      toast.error(t('can')); 
      return;  
    }

    newLocation(city.trim());
    reset();
  };

  return (
    <Box className="app" justifyContent="center">
      <form onSubmit={handleSubmit}>
        <InputGroup mb={3} mx="auto" borderRadius="5px">
          <Input
            width="450px"
            justifyContent="center"
            type="text"
            className="form-control"
            id="cityInput"
            placeholder={t("city")}
            height="30px"
            borderRadius="5px"
            value={city}
            onChange={handleChange}
          />
          <InputRightAddon
            width="100px"
            height="30px"
            borderRadius="5px"
            as="button"
            color="#FFFFFF"
            background="blue"
            type="submit"
            htmlFor="cityInput"
            cursor={"pointer"}
          >
            {t("to")}
          </InputRightAddon>
        </InputGroup>
      </form>
      <ToastContainer />
    </Box>
  );
};

export default Form;
