import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';

import Input from 'components/Input';
import Button from 'components/Button';
import getValidationErrors from 'utils/getValidationErrors';

import formattedMaskCurrency from 'utils/formattedMaskCurrency';
import formattedCurrency from 'utils/formattedCurrency';
import formattedPriceToDB from 'utils/formattedPriceToDB';
import { ModalContainer, BackgroundModal } from './styles';

interface DataForm {
  id: string;
  name: string;
  quantity: number;
  minimumQuantity: number;
  price: number;
  resalePrice: number;
}

interface ProductEditing {
  name: string;
  quantity: number;
  minimumQuantity: number;
  price: number;
  resalePrice: number;
}

interface ModalProps {
  setIsOpen: () => void;
  handleUpdateProduct: (data: Omit<DataForm, 'id'>) => void;
  editingProduct: DataForm;
}

const ModalEditProduct: React.FC<ModalProps> = ({
  editingProduct,
  handleUpdateProduct,
  setIsOpen,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ProductEditing) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório.'),
          quantity: Yup.string().required('Quantidade  obrigatória'),
          minimumQuantity: Yup.string().required(
            'Quantidade minima obrigatória',
          ),
          price: Yup.string().required('Preço obrigatória'),
          resalePrice: Yup.string().required('Preço obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const formattedPrice = formattedPriceToDB(data.price);
        const formattedResalePrice = formattedPriceToDB(data.resalePrice);

        handleUpdateProduct({
          ...data,
          price: Number(formattedPrice),
          resalePrice: Number(formattedResalePrice),
        });

        setIsOpen();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [handleUpdateProduct, setIsOpen],
  );

  const handleFormattedCurrency = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      formattedMaskCurrency(e);
    },
    [],
  );

  return (
    <>
      <BackgroundModal onClick={setIsOpen} />
      <ModalContainer>
        <h1>Editar produto</h1>
        <Form
          onSubmit={handleSubmit}
          ref={formRef}
          initialData={{
            ...editingProduct,
            price: formattedCurrency(Number(editingProduct.price)).replace(
              'R$',
              '',
            ),

            resalePrice: formattedCurrency(
              Number(editingProduct.resalePrice),
            ).replace('R$', ''),
          }}
        >
          <Input name="name" placeholder="Nome" />
          <Input
            name="quantity"
            placeholder="Quantidade"
            type="number"
            min={0}
          />

          <Input
            name="minimumQuantity"
            placeholder="Quantidade minima"
            type="number"
            min={0}
          />

          <Input
            name="price"
            type="text"
            placeholder="R$ Valor de custo"
            onKeyUp={handleFormattedCurrency}
          />

          <Input
            name="resalePrice"
            type="text"
            placeholder="R$ Valor de venda"
            onKeyUp={handleFormattedCurrency}
          />

          <Button type="submit">Editar</Button>
        </Form>
      </ModalContainer>
    </>
  );
};

export default ModalEditProduct;
