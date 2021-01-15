import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FaPlus, FaMinus } from 'react-icons/fa';
import CountUp from 'react-countup';

import api from 'service/api';
import { useToast } from 'hooks/toast';

import Input from 'components/Input';
import Table from 'components/Table';
import Button from 'components/Button';

import formattedMaskCurrency from 'utils/formattedMaskCurrency';
import getValidationErrors from 'utils/getValidationErrors';

import formattedPriceToDB from 'utils/formattedPriceToDB';
import formattedCurrency from 'utils/formattedCurrency';
import ModalDelete from 'components/ModalDelete';
import ModalEditProduct from 'components/ModalEditProduct';
import HeaderMain from 'components/HeaderMain';
import { Container, Content, Wrapper, AlertQtd, Footer } from './styles';

interface FormDataProduct {
  name: string;
  quantity: number;
  minimumQuantity: number;
  price: number;
  resalePrice: number;
}

interface ProductsProps {
  id: string;
  name: string;
  quantity: number;
  minimumQuantity: number;
  priceFormatted: string;
  resalePriceFormatted: string;
  price: number;
  resalePrice: number;
}

interface DeleteProduct {
  id: string;
}

const Product: React.FC = () => {
  const { addToast } = useToast();
  const [products, setProducts] = useState<ProductsProps[]>([]);

  const [searchField, setSearchField] = useState<string>();

  const [totalQuantityProduct, setTotalQuantityProduct] = useState(0);
  const [grossProfitProduct, setGrossProfitProduct] = useState(0);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState<DeleteProduct>(
    {} as DeleteProduct,
  );

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductsProps>(
    {} as ProductsProps,
  );

  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    (async () => {
      const response = await api.get<ProductsProps[]>('products');

      const formattedProducts = response.data.map(product => ({
        ...product,
        priceFormatted: formattedCurrency(Number(product.price)),
        resalePriceFormatted: formattedCurrency(Number(product.resalePrice)),
      }));

      if (!searchField) {
        setProducts(formattedProducts);
      }

      const totalProducts = response.data
        .map(product => product.quantity)
        .reduce((acc, num) => acc + num, 0);

      setTotalQuantityProduct(totalProducts);

      const totalBuy = response.data
        .map(product => product.quantity * Number(product.price))
        .reduce((acc, num) => acc + num, 0);

      const totalSell = response.data
        .map(product => product.quantity * Number(product.resalePrice))
        .reduce((acc, num) => acc + num, 0);

      const total = totalSell - totalBuy;

      setGrossProfitProduct(total);
    })();
  }, [searchField]);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get<ProductsProps[]>(
          `/products/${searchField}`,
        );

        const productsFormatted = response.data.map(product => ({
          ...product,
          priceFormatted: formattedCurrency(Number(product.price)),
          resalePriceFormatted: formattedCurrency(Number(product.resalePrice)),
        }));

        if (searchField) {
          setProducts(productsFormatted);

          const totalProducts = response.data
            .map(product => product.quantity)
            .reduce((acc, num) => acc + num, 0);

          setTotalQuantityProduct(totalProducts);

          const totalBuy = response.data
            .map(product => product.quantity * Number(product.price))
            .reduce((acc, num) => acc + num, 0);

          const totalSell = response.data
            .map(product => product.quantity * Number(product.resalePrice))
            .reduce((acc, num) => acc + num, 0);

          const total = totalSell - totalBuy;

          setGrossProfitProduct(total);
        }
      } catch {
        addToast({
          type: 'error',
          title: 'Erro ao pesquisar produto.',
          description: 'Erro na pesquisa por produto, tente novamente.',
        });
      }
    })();
  }, [addToast, searchField]);

  const handleSubmit = useCallback(
    async (data: FormDataProduct) => {
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

        const response = await api.post('/products', {
          ...data,
          price: Number(formattedPrice),
          resalePrice: Number(formattedResalePrice),
        });

        setProducts([
          {
            ...response.data,
            priceFormatted: formattedCurrency(Number(response.data.price)),
            resalePriceFormatted: formattedCurrency(
              Number(response.data.resalePrice),
            ),
          },
          ...products,
        ]);

        const totalProducts = [response.data, ...products]
          .map(product => product.quantity)
          .reduce((acc, num) => acc + num, 0);

        setTotalQuantityProduct(totalProducts);

        const totalBuy = [response.data, ...products]
          .map(product => product.quantity * Number(product.price))
          .reduce((acc, num) => acc + num, 0);

        const totalSell = [response.data, ...products]
          .map(product => product.quantity * Number(product.resalePrice))
          .reduce((acc, num) => acc + num, 0);

        const total = totalSell - totalBuy;

        setGrossProfitProduct(total);

        addToast({
          type: 'success',
          title: 'Produto cadastrado com sucesso',
        });

        formRef.current?.reset();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);
          formRef.current?.setErrors(error);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na cadastro do produto',
          description:
            'ocorreu um erro ao cadastrar o produto, tente novamente.',
        });
      }
    },
    [addToast, products],
  );

  const handleFormattedCurrency = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      formattedMaskCurrency(e);
    },
    [],
  );

  const toggleDeleteModal = useCallback(() => {
    setDeleteModalOpen(prevState => !prevState);
  }, []);

  const handleDeleteProduct = useCallback(async () => {
    try {
      await api.delete(`/products/${deleteProduct.id}`);

      const findProduct = products.filter(
        product => product.id !== deleteProduct.id,
      );

      setProducts(findProduct);
      toggleDeleteModal();

      const totalProducts = findProduct
        .map(product => product.quantity)
        .reduce((acc, num) => acc + num, 0);

      setTotalQuantityProduct(totalProducts);

      const totalBuy = findProduct
        .map(product => product.quantity * Number(product.price))
        .reduce((acc, num) => acc + num, 0);

      const totalSell = findProduct
        .map(product => product.quantity * Number(product.resalePrice))
        .reduce((acc, num) => acc + num, 0);

      const total = totalSell - totalBuy;

      setGrossProfitProduct(total);

      addToast({
        type: 'info',
        title: 'Produto excluído com sucesso.',
      });
    } catch {
      addToast({
        type: 'error',
        title: 'Erro ao excluir.',
        description: 'Erro ao excluir produto, tente novamente.',
      });
    }
  }, [addToast, deleteProduct, products, toggleDeleteModal]);

  const handleDelete = useCallback(
    (id: DeleteProduct) => {
      setDeleteProduct(id);
      toggleDeleteModal();
    },
    [toggleDeleteModal],
  );

  const toggleEditModal = useCallback(() => {
    setEditModalOpen(prevState => !prevState);
  }, []);

  const handleEditProduct = useCallback(
    (product: ProductsProps) => {
      setEditingProduct(product);
      toggleEditModal();
    },
    [toggleEditModal],
  );

  const handleUpdateProduct = useCallback(
    async (
      product: Omit<
        ProductsProps,
        'id' | 'priceFormatted' | 'resalePriceFormatted'
      >,
    ) => {
      try {
        const response = await api.put(`/products/${editingProduct.id}`, {
          ...product,
        });

        setProducts(
          products.map(mappedProduct =>
            mappedProduct.id === editingProduct.id
              ? {
                  ...response.data,
                  priceFormatted: formattedCurrency(Number(product.price)),
                  resalePriceFormatted: formattedCurrency(
                    Number(product.resalePrice),
                  ),
                }
              : mappedProduct,
          ),
        );

        const totalProducts = [response.data, ...products]
          .map(p => p.quantity)
          .reduce((acc, num) => acc + num, 0);

        setTotalQuantityProduct(totalProducts);

        const totalBuy = [response.data, ...products]
          .map(p => p.quantity * Number(p.price))
          .reduce((acc, num) => acc + num, 0);

        const totalSell = [response.data, ...products]
          .map(p => p.quantity * Number(p.resalePrice))
          .reduce((acc, num) => acc + num, 0);

        const total = totalSell - totalBuy;

        setGrossProfitProduct(total);

        addToast({
          type: 'success',
          title: 'Editado com sucesso.',
        });
      } catch {
        addToast({
          type: 'error',
          title: 'Erro ao editar',
          description: 'Ocorreu um erro ao editar, tente novamente.',
        });
      }
    },
    [addToast, products, editingProduct],
  );

  const handlePlusQuantityProduct = useCallback(
    async (product: ProductsProps) => {
      try {
        const response = await api.patch(`/products/${product.id}`, {
          quantity: product.quantity + 1,
        });

        setProducts(
          products.map(mappedProduct =>
            mappedProduct.id === product.id
              ? {
                  ...response.data,
                  priceFormatted: formattedCurrency(Number(product.price)),
                  resalePriceFormatted: formattedCurrency(
                    Number(product.resalePrice),
                  ),
                }
              : mappedProduct,
          ),
        );

        const totalProducts = [response.data, ...products]
          .map(p => p.quantity)
          .reduce((acc, num) => acc + num, 0);

        setTotalQuantityProduct(totalProducts);

        const totalBuy = [response.data, ...products]
          .map(p => p.quantity * Number(p.price))
          .reduce((acc, num) => acc + num, 0);

        const totalSell = [response.data, ...products]
          .map(p => p.quantity * Number(p.resalePrice))
          .reduce((acc, num) => acc + num, 0);

        const total = totalSell - totalBuy;

        setGrossProfitProduct(total);

        setTotalQuantityProduct(totalQuantityProduct + 1);
      } catch {
        addToast({
          type: 'error',
          title: 'Erro ao editar',
          description: 'Ocorreu um erro ao editar, tente novamente.',
        });
      }
    },
    [products, addToast, totalQuantityProduct],
  );

  const handleMinusQuantityProduct = useCallback(
    async (product: ProductsProps) => {
      try {
        const quantityMinus = product.quantity;

        const response = await api.patch(`/products/${product.id}`, {
          quantity: quantityMinus > 0 ? quantityMinus - 1 : 0,
        });

        setProducts(
          products.map(mappedProduct =>
            mappedProduct.id === product.id
              ? {
                  ...response.data,
                  priceFormatted: formattedCurrency(Number(product.price)),
                  resalePriceFormatted: formattedCurrency(
                    Number(product.resalePrice),
                  ),
                }
              : mappedProduct,
          ),
        );

        const totalProducts = [response.data, ...products]
          .map(p => p.quantity)
          .reduce((acc, num) => acc + num, 0);

        setTotalQuantityProduct(totalProducts);

        const totalBuy = [response.data, ...products]
          .map(p => p.quantity * Number(p.price))
          .reduce((acc, num) => acc + num, 0);

        const totalSell = [response.data, ...products]
          .map(p => p.quantity * Number(p.resalePrice))
          .reduce((acc, num) => acc + num, 0);

        const total = totalSell - totalBuy;

        setGrossProfitProduct(total);

        setTotalQuantityProduct(totalQuantityProduct - 1);
      } catch {
        addToast({
          type: 'error',
          title: 'Erro ao editar',
          description: 'Ocorreu um erro ao editar, tente novamente.',
        });
      }
    },
    [products, addToast, totalQuantityProduct],
  );

  const handleSearchKeyUp = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget;
      setSearchField(value);
    },
    [],
  );

  return (
    <Container>
      {deleteModalOpen && (
        <ModalDelete
          setIsOpen={toggleDeleteModal}
          handleDelete={handleDeleteProduct}
        />
      )}

      {editModalOpen && (
        <ModalEditProduct
          setIsOpen={toggleEditModal}
          editingProduct={editingProduct}
          handleUpdateProduct={handleUpdateProduct}
        />
      )}

      <HeaderMain
        name="search"
        title="Cadastro de Produto"
        handleSearchKeyUp={handleSearchKeyUp}
        placeholder="Pesquise pelo nome do produto"
      />

      <Content>
        <Form onSubmit={handleSubmit} ref={formRef}>
          <Wrapper>
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
          </Wrapper>

          <Wrapper>
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

            <Button type="submit">Cadastrar</Button>
          </Wrapper>
        </Form>
      </Content>

      <Table
        nameOne="Nome"
        nameTwo="Quantidade"
        nameTree="Valor compra"
        nameFour="Valor venda"
      >
        {products.map(product => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <AlertQtd alertQtd={product.quantity <= product.minimumQuantity}>
              {product.quantity}
              <button
                className="actionQtd"
                type="button"
                onClick={() => handlePlusQuantityProduct(product)}
              >
                <FaPlus />
              </button>
              <button
                className="actionQtd"
                type="button"
                onClick={() => handleMinusQuantityProduct(product)}
              >
                <FaMinus />
              </button>
            </AlertQtd>

            <td>{product.priceFormatted}</td>
            <td>{product.resalePriceFormatted}</td>

            <td className="btnAction">
              <button type="button" onClick={() => handleEditProduct(product)}>
                Editar
              </button>
              <button
                type="button"
                onClick={() => handleDelete({ id: product.id })}
              >
                Deletar
              </button>
            </td>
          </tr>
        ))}
      </Table>

      <Footer>
        <p>{`Total de produtos: ${totalQuantityProduct}`}</p>
        <p>
          <CountUp
            end={grossProfitProduct}
            prefix="Bruto: R$"
            separator="."
            decimal=","
            decimals={2}
          />
        </p>
      </Footer>
    </Container>
  );
};

export default Product;
