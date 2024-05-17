import React from "react";
import {
  Box,
  Text,
  Table,
  Tbody,
  Tr,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

const CharacterCard = ({ character, isOpen, onClose, overlay }) => {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      {overlay}
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            {character.name}
          </Text>
          <Table variant="simple">
            <Tbody>
              <Tr>
                <Td>Height</Td>
                <Td>{character.height} cm</Td>
              </Tr>
              <Tr>
                <Td>Mass</Td>
                <Td>{character.mass} kg</Td>
              </Tr>
              <Tr>
                <Td>Hair Color</Td>
                <Td>{character.hair_color}</Td>
              </Tr>
              <Tr>
                <Td>Skin Color</Td>
                <Td>{character.skin_color}</Td>
              </Tr>
              <Tr>
                <Td>Eye Color</Td>
                <Td>{character.eye_color}</Td>
              </Tr>
              <Tr>
                <Td>Birth Year</Td>
                <Td>{character.birth_year}</Td>
              </Tr>
              <Tr>
                <Td>Gender</Td>
                <Td>{character.gender}</Td>
              </Tr>
            </Tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CharacterCard;
