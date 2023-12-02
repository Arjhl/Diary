//this component is used to make a diary public which also collects the key
import { Switch, useDisclosure, useToast } from "@chakra-ui/react";
import { FormLabel } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  Button,
  Input,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

type propTypes = {
  isPublic: boolean;
  setPublic: Function;
  makePrivate: Function;
};

const DiaryToggle = (props: propTypes) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [key, setkey] = useState("");
  const [switchState, setSwitchState] = useState(props.isPublic);
  const initialRef = useRef<any>();
  const toast = useToast();

  useEffect(() => {
    setSwitchState(props.isPublic);
  }, []);

  const saveHandler = () => {
    if (key?.length != 8) {
      toast({
        title: "Key Not Entered.",
        description: "Need to key to encrypt the public data.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setSwitchState(!switchState);
    }
    onClose();
    if (!switchState) {
      const result = props.setPublic(key);
      setSwitchState(result);
    } else {
      const result = props.makePrivate(key);
      if (result == true) {
        setSwitchState(false);
      }
    }
  };

  return (
    <div className="flex">
      <FormLabel>Make this diary Public?</FormLabel>
      <Switch onChange={onOpen} isChecked={switchState} />

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter Your Public Key</ModalHeader>
          <ModalCloseButton
            onClick={() => {
              setSwitchState(false);
              onClose();
            }}
          />
          <ModalBody pb={6}>
            <FormControl>
              <Input
                ref={initialRef}
                type="number"
                min={8}
                max={8}
                placeholder="Public Key"
                onChange={(e) => {
                  setkey(e.target.value);
                }}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} type="submit" onClick={saveHandler}>
              Save
            </Button>
            <Button
              onClick={() => {
                //setpublic false
                setSwitchState(false);
                onClose();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DiaryToggle;
