import { Form, Input, Select, Radio, Space, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import RequiredSwitch from "../switch/RequiredSwitch";
import TextArea from "antd/es/input/TextArea";
import { useSelector } from "react-redux";
const { Option } = Select;

const AddEditQuestionForm = ({
  form,

  isEditForm,
  isRequired,
  questionText,
  setQuestionText,
  questionType,
  setQuestionType,
  handleSelectQuestionType,
  setOptionObjects,
  optionsObjects,
  questionTypes,
  handleAddOption,
  onRequiredChange,
  options, 
  setOptions,

}) => {



  return (
  
    <Form
    form={form}
      className="mx-auto"
      style={{
        maxWidth: 600,
      }}
      layout="vertical"
   // initialValues={{ questionText: "", questionType: "" , isRequired : false }}   
    >
  
      <div className="d-flex justify-content-between">
        <Form.Item name="title" label="Soru" className="mt-3" 
          rules={[
            {
              required: true,
              message: "Soru başlığını doldurunuz lütfen !",
            },
          ]}
        >
          <Input
            type="text"
            placeholder="Soruyu yazınız "
            defaultValue={isEditForm ? questionText : ""}
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
        </Form.Item>
        <Form.Item name="questionType" label="Soru Tipi" className="mt-3"
           rules={[
            {
              required: true,
              message: "Soru tipini şeçiniz lütfen !",
            },
          ]}
        >
          <Select
            showSearch
            style={{
              width: 200,
            }}
            placeholder="Search to Select"
            onChange={handleSelectQuestionType}
            defaultValue={isEditForm ? questionType : ""}
            value={questionType}
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
          >
            {questionTypes.map((questionType) => (
              <Option  value={questionType} key={questionType}>
                {questionType}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      {questionType == "Kısa Yanıt" && (
        <Form.Item name="question" className="mt-3 ">
          <Input type="text" placeholder="Kısa yanıt metni" disabled={true} />
        </Form.Item>
      )}
      {questionType === "Uzun Yanıt" && (
        <Form.Item name="question" className="mt-3 ">
          <TextArea
            disabled={true}
            rows={4}
            placeholder="Uzun Yanıt metni"
            maxLength={100}
          />
        </Form.Item>
      )}
      {questionType === "Çoktan Seçmeli" && (
        <>
          <p>Seçenekler</p>
          <Form.List name="options" initialValue={options}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, index) => (
                  <Space
                    key={key}
                    style={{
                      display: "flex",
                      marginBottom: 8,
                    }}
                    align="baseline"
                  >
                    <Form.Item {...restField} name={[name, "option"]}>
                      <div className="d-inline-flex">
                        <Radio disabled={true} />
                        <Input
                        
                          value={isEditForm ? options[index] : optionsObjects[index].option}
                          onChange={(e) =>
                            setOptionObjects(
                              optionsObjects.map((o, i) =>
                                i === index
                                  ? { ...o, option: e.target.value }
                                  : o
                              )
                            )
                          }
                          placeholder="Seçenek Giriniz"
                        />
                      </div>
                    </Form.Item>

                    <MinusCircleOutlined
                      onClick={() => {
                        remove(name);
                        setOptionObjects(
                          optionsObjects.filter((_, i) => i !== index)
                        );
                      }}
                    />
                  </Space>
                ))}
                {/* {
                    optionsObjects.length > 1 && (
                      <Form.Item className="d-flex justify-content-end">
                      <Button
                        type="primary"
                     
                        onClick={() => {
                          handleSaveOptions()
                        }}
                        block
                     
                      >
                        Seçenekleri Kaydet
                      </Button>
                    </Form.Item>
                    )
                  } */}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                      handleAddOption();
                    }}
                    block
                    icon={<PlusOutlined />}
                  >
                    Seçenek Ekle
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </>
      )}
      <Form.Item name="isRequired" className="mt-3">
      <div className="d-inline-flex">
        <p className="me-3">Gerekli</p>
        <RequiredSwitch isRequired={isRequired} onRequiredChange={onRequiredChange} />
      </div>
      </Form.Item>
    </Form>
  );
};

export default AddEditQuestionForm;
