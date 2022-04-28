import { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { ScrollView, Text, TextInput, Button, Platform, View } from "react-native";
import { Base, Typography, Form } from '../../styles';
import productModel from '../../models/products';
import deliveryModel from '../../models/deliveries';
import Delivery from '../../interfaces/delivery';
import Product from '../../interfaces/product';

type ProductDDProps = {
    delivery: Partial<Delivery>,
    setDelivery: (delivery: Partial<Delivery>) => void,
    setCurrentProduct: (product: Partial<Product>) => void,
};

type DateTimePickerProps = {
    delivery: Partial<Delivery>,
    setDelivery: (delivery: Partial<Delivery>) => void,
};

function ProductDropDown(props: ProductDDProps) {
    const [products, setProducts] = useState<Product[]>([]);
    let productsHash: any = {};

    const itemsList = products.map((prod, index) => {
        productsHash[prod.id] = prod;
        return <Picker.Item key={index} label={prod.name} value={prod.id} />;
    });

    useEffect(() => {
        (async () => setProducts(await productModel.getProducts()))();
    }, []);

    return (
        <Picker
            style={ Form.dropdown }
            selectedValue={props.delivery?.product_id}
            onValueChange={(itemValue) => {
            props.setDelivery({ ...props.delivery, product_id: itemValue });
            props.setCurrentProduct(productsHash[itemValue]);
        }}>
            {itemsList}
        </Picker>
    );
}

function DateDropDown(props: DateTimePickerProps) {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <View style={ Form.div(14) }>
            {Platform.OS === 'android' && (
            <Button color="#222" onPress={showDatePicker} title="Visa datumvæljare"/>
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker 
                    onChange={(event: any, date) => {
                        setDropDownDate(date);
                        setShow(false);
                        props.setDelivery({
                            ...props.delivery,
                            delivery_date: date.toLocaleDateString('se-sv')
                        });
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    )
};

export default function DeliveryForm({ navigation, setProducts } : 
    { navigation: any, setProducts: (products: Array<Product>) => void}) {
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

    async function addDelivery() {
        if (currentProduct.stock !== undefined && delivery.amount !== undefined) {
        // Send delivery to delivery model
        await deliveryModel.addDelivery(delivery);
        // Increase the amount of products in stock
        currentProduct.stock += delivery.amount; 
        await productModel.updateProduct(currentProduct);
        setProducts(await productModel.getProducts());
      }
    }

    return (
        <ScrollView style={ Base.base }>
            <Text style={ Typography.header2 }>Ny inleverans</Text>

            <Text style={ Typography.label }>Kommentar</Text>
            <TextInput
                style={ Form.input }
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, comment: content })
                }}
                value={delivery?.comment}
            />

            <Text style={ Typography.label }>Antal</Text>
            <TextInput
                style={ Form.input }
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, amount: parseInt(content) })
                }}
                value={delivery?.amount?.toString()}
                keyboardType="numeric"
            />

            <Text style={ Typography.label }>Produkt</Text>
            <ProductDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                setCurrentProduct={setCurrentProduct}
            />

            <DateDropDown 
                delivery={delivery}
                setDelivery={setDelivery} />
            <View>
                <Button
                    title="Gör inleverans"
                    color="#222"
                    onPress={() => {
                        addDelivery();
                        navigation.replace('List')
                    }}
                />
            </View>
        </ScrollView>
    );
};