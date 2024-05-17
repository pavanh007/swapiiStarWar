import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Heading,
  Spinner,
  Text,
  IconButton,
  Flex,
  Image,
  Wrap,
  WrapItem,
  useDisclosure,
  ModalOverlay,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import CharacterCard from "./components/CharacterCard";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayTwo />);

  useEffect(() => {
    fetchCharacters();
    loadFavorites();
  }, [currentPage]);

  const fetchCharacters = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://swapi.dev/api/people/?page=${currentPage}`
      );
      setCharacters(response.data.results);
      setError(null);
    } catch (error) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const getCharacterImage = (characterId) => {
    return `https://starwars-visualguide.com/assets/img/characters/${
      characterId + currentPage
    }.jpg`;
  };

  const loadFavorites = () => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  };

  const toggleFavorite = (character) => {
    let updatedFavorites;
    if (favorites.find((fav) => fav.name === character.name)) {
      updatedFavorites = favorites.filter((fav) => fav.name !== character.name);
    } else {
      updatedFavorites = [...favorites, character];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const isFavorite = (character) => {
    return favorites.some((fav) => fav.name === character.name);
  };

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    onOpen();
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={20}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={20}>
        <Text color="red.500">{error}</Text>
        <Button mt={4} onClick={fetchCharacters}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box p={10} width="100vw" backgroundColor="#121010">
      <Heading
        mb={5}
        textAlign="center"
        sx={{
          fontFamily: "'Star Jedi', sans-serif", // Apply the Star Jedi font here
          background:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(121,17,9,1) 57%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: "124px",
        }}
      >
        STAR WARS
      </Heading>
      {selectedCharacter && (
        <CharacterCard
          character={selectedCharacter}
          isOpen={isOpen}
          onClose={onClose}
          overlay={overlay}
        />
      )}
      <Flex justifyContent="center" alignItems="center">
        <Wrap width="100vw" justify="center" align="center">
          {characters.map((character, index) => (
            <WrapItem
              key={index}
              p={5}
              borderWidth="1px"
              borderRadius="lg"
              flexDirection="column"
              alignItems="center"
              m={2}
              boxShadow="sm"
              _hover={{
                // boxShadow: "md",
                transform: "translateY(-2px)",
                boxShadow: "0px 3px 15px rgba(255, 255, 255, 1)"
              }}
              transition="all 0.2s"
              width="300px"
              height="400px"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0)), url(${getCharacterImage(
                  index
                )})`,
              }}
              onClick={() => handleCharacterClick(character)}
              cursor="pointer"
            >
              <Box textAlign="center">
                <IconButton
                  icon={<StarIcon />}
                  colorScheme={isFavorite(character) ? "yellow" : "gray"}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(character);
                  }}
                  aria-label="Favorite"
                  size="lg"
                  zIndex={2}
                  top={2}
                  left={100}
                />
                <Box mt={250}>
                  <Image alt={`${character.name} image`} mb={2} />
                  <Text fontSize="2xl" fontWeight="bold" color="white">
                    {character.name}
                  </Text>
                </Box>
              </Box>
            </WrapItem>
          ))}
        </Wrap>
      </Flex>
      <Box
        bottom={5}
        right={5}
        display="flex"
        flexDirection="row"
        alignItems="space-between"
        justifyContent="center"
        padding="auto"
        marginTop="50px"
      >
        <Button
          style={{
            marginLeft: "10px",
            backgroundColor: "white",
            color: "black",
            width: "100px",
          }}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          mb={2}
        >
          Previous
        </Button>
        <Button
          style={{
            marginLeft: "10px",
            backgroundColor: "white",
            color: "black",
            width: "100px",
          }}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

const OverlayTwo = () => (
  <ModalOverlay
    bg="none"
    backdropFilter="auto"
    backdropInvert="80%"
    backdropBlur="50px"
  />
);

export default App;
