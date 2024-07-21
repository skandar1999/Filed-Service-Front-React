import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { Formik } from "formik";
import * as yup from "yup";
import "./FormExample.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Swal from "sweetalert2";
import { FaCalendarAlt, FaChevronUp, FaChevronDown } from "react-icons/fa";

function FormExample() {
  const schema = yup.object().shape({
    itemType: yup.string().required("Item type is required"),
    itemNumber: yup.string().required("Item number is required"),
    description: yup.string().required("Description is required"),
    manufacturer: yup.string().required("Manufacturer is required"),
    barcode: yup.string().required("Barcode is required"),
    terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
    price: yup.string().required("Price is required"),
    purchasePrice: yup.string().required("Purchase price is required"),
    currency: yup.string().required("Currency is required"),
    ValidFrom: yup.date().required("Valid From date is required"),
    ValidTo: yup.date().required("Valid To date is required"),
    Quantity: yup.string().required("Quantity unit is required"),
    ProductFamilyID: yup.string().required("Product family is required"),
    Qtystep: yup.string().required("Quantity step is required"),
    ArticleGroup1: yup.string().required("Article group is required"),
    ArticleGroup2: yup.string().required("Article group is required"),
    ArticleGroup3: yup.string().required("Article group is required"),
    ArticleGroup4: yup.string().required("Article group is required"),
    ArticleGroup5: yup.string().required("Article group is required"),
    Warranty: yup.string().required("Warranty is required"),
    Guarantee: yup.string().required("Guarantee is required"),
    vat: yup.string().required("VAT is required"),
  });

  const [submitting, setSubmitting] = useState(false);
  const [productFamilies, setProductFamilies] = useState([]);

  useEffect(() => {
    const fetchProductFamilies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4804/api/ProductFamily"
        );
        
        const productFamiliesArray = response.data["$values"];
    
        // Extracting only the necessary fields
        const formattedProductFamilies = productFamiliesArray.map(family => ({
          id: family.id,
          name: family.name
        }));
    
        setProductFamilies(formattedProductFamilies);
      } catch (error) {
        console.error("Error fetching product families:", error);
      }
    };
    
    fetchProductFamilies();
  }, []); // Empty dependency array ensures this effect runs only once

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log("Submitting article with values:", values);

      const requestData = {
        ...values,
        productFamilyID: values.ProductFamilyID  // Send only the product family id
      };

      const response = await axios.post(
        "http://localhost:4804/api/article",
        requestData
      );
      console.log("Article successfully added:", response.data);

      Swal.fire({
        icon: "success",
        title: "Product Added",
        text: "Your product has been successfully added!",
        confirmButtonText: "OK",
      });

    } catch (error) {
      console.error("Error adding article:", error);

      let errorMessage = "Failed to add product. Please try again later.";
      if (error.response && error.response.data && error.response.data.errors) {
        errorMessage = Object.values(error.response.data.errors).join(" ");
      } else if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        confirmButtonText: "OK",
      });
    } finally {
      setSubmitting(false);
    }
  };


  const CustomDatePickerInput = ({ value, onClick }) => (
    <InputGroup>
      <InputGroup.Text>
        <FaCalendarAlt />
      </InputGroup.Text>
      <Form.Control
        type="text"
        value={value}
        onClick={onClick}
        readOnly
        placeholder="Select date"
      />
    </InputGroup>
  );

  const handleIncrement = (setFieldValue, value) => {
    setFieldValue("Quantity", (parseInt(value) || 0) + 1);
  };

  const handleDecrement = (setFieldValue, value) => {
    setFieldValue("Quantity", (parseInt(value) || 0) - 1);
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        itemType: "itemType",
        itemNumber: "itemNumber",
        description: "description",
        manufacturer: "manufacturer",
        barcode: "barcode",
        terms: false,
        price: "price",
        purchasePrice: "purchasePrice",
        currency: "currency",
        ValidFrom: null,
        ValidTo: null,
        Quantity: "Quantity",
        ProductFamilyID: "",
        Qtystep: "Qtystep",
        ArticleGroup1: "ArticleGroup1",
        ArticleGroup2: "ArticleGroup2",
        ArticleGroup3: "ArticleGroup3",
        ArticleGroup4: "ArticleGroup4",
        ArticleGroup5: "ArticleGroup5",
        Warranty: "Warranty",
        Guarantee: "Guarantee",
        vat: "vat",
      }}
      onSubmit={handleSubmit}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
        setFieldValue,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row>
            <h2 className="form-title">Add New Article</h2>
          </Row>

          <Row className="mb-3 mt-3">
            <Form.Text className="text-muted">Basic Information</Form.Text>
            <Form.Group
              as={Col}
              md="4"
              controlId="validationFormik101"
              className="position-relative"
            >
              <Form.Label>Item type</Form.Label>
              <Form.Control
                type="text"
                name="itemType"
                value={values.itemType}
                onChange={handleChange}
                isValid={touched.itemType && !errors.itemType}
                isInvalid={!!errors.itemType}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.itemType}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              md="4"
              controlId="validationFormik102"
              className="position-relative"
            >
              <Form.Label>Item number</Form.Label>
              <Form.Control
                type="text"
                name="itemNumber"
                value={values.itemNumber}
                onChange={handleChange}
                isValid={touched.itemNumber && !errors.itemNumber}
                isInvalid={!!errors.itemNumber}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.itemNumber}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              md="4"
              controlId="validationFormikdescription2"
            >
              <Form.Label>Description</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.description}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="8"
              controlId="validationFormik103"
              className="position-relative"
            >
              <Form.Label>Manufacturer</Form.Label>
              <Form.Control
                type="text"
                placeholder="Manufacturer"
                name="Manufacturer"
                value={values.Manufacturer}
                onChange={handleChange}
                isInvalid={!!errors.Manufacturer}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.Manufacturer}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              md="4"
              controlId="validationFormik104"
              className="position-relative"
            >
              <Form.Label>Barcode</Form.Label>
              <Form.Control
                type="text"
                placeholder="Barcode"
                name="Barcode"
                value={values.Barcode}
                onChange={handleChange}
                isInvalid={!!errors.Barcode}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.Barcode}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3 mt-5">
            <Form.Group
              as={Col}
              md="12"
              controlId="validationFormik105"
              className="position-relative"
            >
              <Form.Label>Product family</Form.Label>
              <Form.Control
              as="select"
              name="ProductFamilyID"
              value={values.ProductFamilyID.id}  // Ensure value is set to the id
              onChange={handleChange}
              isInvalid={touched.ProductFamilyID && !!errors.ProductFamilyID}
              className="form-select"
            >
              <option value="">Select a product family...</option>
              {productFamilies.map(family => (
                <option key={family.id} value={family.id}>{family.name}</option>
              ))}
            </Form.Control>

        <Form.Control.Feedback type="invalid" tooltip>
          {errors.ProductFamilyID}
        </Form.Control.Feedback>
      </Form.Group>
    </Row>

          <Row className="mb-3 mt-5">
            <Form.Text className="text-muted">Extended Information</Form.Text>
            <Form.Group
              as={Col}
              md="4"
              controlId="validationFormik106"
              className="position-relative"
            >
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={values.price}
                onChange={handleChange}
                isValid={touched.price && !errors.price}
                isInvalid={!!errors.price}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.price}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              md="4"
              controlId="validationFormik107"
              className="position-relative"
            >
              <Form.Label>Purchase price</Form.Label>
              <Form.Control
                type="text"
                name="purchasePrice"
                value={values.purchasePrice}
                onChange={handleChange}
                isValid={touched.purchasePrice && !errors.purchasePrice}
                isInvalid={!!errors.purchasePrice}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.purchasePrice}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              md="4"
              controlId="validationFormik108"
              className="position-relative"
            >
              <Form.Label>Currency</Form.Label>
              <Form.Control
                as="select"
                name="currency"
                value={values.currency}
                onChange={handleChange}
                isInvalid={!!errors.currency}
                className="form-select"
              >
                <option value="">Select a currency...</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="JPY">JPY</option>
                <option value="GBP">GBP</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.currency}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="4"
              controlId="validationFormik109"
              className="position-relative"
            >
              <Form.Label>Valid From</Form.Label>
              <br></br>
              <DatePicker
                selected={values.ValidFrom}
                onChange={(date) => setFieldValue("ValidFrom", date)}
                customInput={<CustomDatePickerInput />}
                dateFormat="yyyy-MM-dd"
              />
              {errors.ValidFrom && touched.ValidFrom && (
                <div className="invalid-feedback d-block">
                  {errors.ValidFrom}
                </div>
              )}
            </Form.Group>

            <Form.Group
              as={Col}
              md="4"
              controlId="validationFormik110"
              className="position-relative"
            >
              <Form.Label>Valid To</Form.Label>
              <br></br>
              <DatePicker
                selected={values.ValidTo}
                onChange={(date) => setFieldValue("ValidTo", date)}
                customInput={<CustomDatePickerInput />}
                dateFormat="yyyy-MM-dd"
              />
              {errors.ValidTo && touched.ValidTo && (
                <div className="invalid-feedback d-block">{errors.ValidTo}</div>
              )}
            </Form.Group>

            <Form.Group
              as={Col}
              md="4"
              controlId="validationFormik111"
              className="position-relative"
            >
              <Form.Label>Quantity</Form.Label>
              <InputGroup className="quantity-input-group">
                <Form.Control
                  type="text"
                  placeholder="Quantity unit"
                  name="Quantity"
                  value={values.Quantity}
                  onChange={handleChange}
                  isInvalid={!!errors.Quantity}
                />
                <InputGroup.Text className="quantity-buttons">
                  <Button
                    variant="outline-secondary"
                    onClick={() =>
                      handleIncrement(setFieldValue, values.Quantity)
                    }
                    className="quantity-button"
                  >
                    <FaChevronUp />
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() =>
                      handleDecrement(setFieldValue, values.Quantity)
                    }
                    className="quantity-button"
                  >
                    <FaChevronDown />
                  </Button>
                </InputGroup.Text>
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.Quantity}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="4"
              controlId="validationFormik112"
              className="position-relative"
            >
              <Form.Label>Quantity step</Form.Label>
              <Form.Control
                type="text"
                placeholder="Quantity step"
                name="Qtystep"
                value={values.Qtystep}
                onChange={handleChange}
                isInvalid={!!errors.Qtystep}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.Qtystep}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              md="4"
              controlId="validationFormik113"
              className="position-relative"
            >
              <Form.Label>Article group 1</Form.Label>
              <Form.Control
                type="text"
                placeholder="Article group 1"
                name="ArticleGroup1"
                value={values.ArticleGroup1}
                onChange={handleChange}
                isInvalid={!!errors.ArticleGroup1}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.ArticleGroup1}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              md="4"
              controlId="validationFormik114"
              className="position-relative"
            >
              <Form.Label>Article group 2</Form.Label>
              <Form.Control
                type="text"
                placeholder="Article group 2"
                name="ArticleGroup2"
                value={values.ArticleGroup2}
                onChange={handleChange}
                isInvalid={!!errors.ArticleGroup2}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.ArticleGroup2}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="4"
              controlId="validationFormik115"
              className="position-relative"
            >
              <Form.Label>Article group 3</Form.Label>
              <Form.Control
                type="text"
                placeholder="Article group 3"
                name="ArticleGroup3"
                value={values.ArticleGroup3}
                onChange={handleChange}
                isInvalid={!!errors.ArticleGroup3}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.ArticleGroup3}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              md="4"
              controlId="validationFormik116"
              className="position-relative"
            >
              <Form.Label>Article group 4</Form.Label>
              <Form.Control
                type="text"
                placeholder="Article group 4"
                name="ArticleGroup4"
                value={values.ArticleGroup4}
                onChange={handleChange}
                isInvalid={!!errors.ArticleGroup4}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.ArticleGroup4}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              md="4"
              controlId="validationFormik117"
              className="position-relative"
            >
              <Form.Label>Article group 5</Form.Label>
              <Form.Control
                type="text"
                placeholder="Article group 5"
                name="ArticleGroup5"
                value={values.ArticleGroup5}
                onChange={handleChange}
                isInvalid={!!errors.ArticleGroup5}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.ArticleGroup5}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="4"
              controlId="validationFormik118"
              className="position-relative"
            >
              <Form.Label>Warranty</Form.Label>
              <Form.Control
                type="text"
                placeholder="Warranty"
                name="Warranty"
                value={values.Warranty}
                onChange={handleChange}
                isInvalid={!!errors.Warranty}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.Warranty}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              md="4"
              controlId="validationFormik119"
              className="position-relative"
            >
              <Form.Label>Guarantee</Form.Label>
              <Form.Control
                type="text"
                placeholder="Guarantee"
                name="Guarantee"
                value={values.Guarantee}
                onChange={handleChange}
                isInvalid={!!errors.Guarantee}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.Guarantee}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              md="4"
              controlId="validationFormik120"
              className="position-relative"
            >
              <Form.Label>VAT</Form.Label>
              <Form.Control
                type="text"
                placeholder="VAT"
                name="vat"
                value={values.vat}
                onChange={handleChange}
                isInvalid={!!errors.vat}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.vat}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Form.Group className="mb-3">
            <Form.Check
              required
              name="terms"
              label="Agree to terms and conditions"
              onChange={handleChange}
              isInvalid={!!errors.terms}
              feedback={errors.terms}
              feedbackType="invalid"
              id="validationFormik0"
            />
          </Form.Group>

          <Button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default FormExample;
