import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  Button,
  Input,
  useToast,
} from "@chakra-ui/react";

import { useEffect, useRef, useState } from "react";

type proptypes = {
  setKey: Function;
  isPublic: boolean;
};

const KeyModal = (props: proptypes) => {
  const [key, setKey] = useState("");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef<any>();

  useEffect(() => {
    if (props.isPublic) {
      onOpen();
    }
  }, []);

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Enter Your Public Key</ModalHeader>
        <ModalBody pb={6}>
          <FormControl>
            <Input
              ref={initialRef}
              type="number"
              min={8}
              max={8}
              placeholder="Public Key"
              onChange={(e) => {
                setKey(e.target.value);
              }}
            />
            <p className=" text-red-800 text-center font-bold">
              If public key not provided this diary cannot be accessed
            </p>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            mr={3}
            type="submit"
            onClick={() => {
              console.log(key.length);
              if (key?.length !== 8) {
                toast({
                  title: "Key not valid.",
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
              } else {
                props.setKey(key);
                onClose();
              }
            }}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default KeyModal;
