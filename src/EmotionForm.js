import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Box, Checkbox, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Button, Container, Flex, Stack } from "@chakra-ui/react";

const emotionsData = {
  "ANNOYED": ["Bitter", "Edgy", "Exasperated", "Frustrated", "Grumpy", "Impatient", "Irritable", "Irked"],
  "ANGRY": ["Agitated", "Enraged", "Exasperated", "Furious", "Irate", "Outraged", "Resentful", "Upset"],
  "AVERSION": ["Appalled", "Contempt", "Disgusted", "Dislike", "Horrified", "Repulsed"],
  "CONFUSED": ["Baffled", "Bewildered", "Dazed", "Hesitant", "Lost", "Mystified", "Perplexed", "Puzzled", "Torn"],
  "DISCOMFORT": ["Agitated", "Alarmed", "Discombobulated", "Disturbed", "Perturbed", "Rattled", "Restless", "Shocked", "Startled", "Surprised", "Troubled", "Turbulent", "Uncomfortable", "Uneasy", "Unsettled"],
  "DISCONNECTED": ["Apathetic", "Bored", "Distant", "Distracted", "Indifferent", "Numb", "Uninterested", "Withdrawn"],
  "EMBARRASSED": ["Ashamed", "Flustered", "Guilty", "Self-conscious"],
  "FEARFUL": ["Afraid", "Apprehensive", "Anxious", "Distress", "Frightened", "Hesitant", "Nervous", "Panicked", "Paralyzed", "Petrified", "Scared", "Tense", "Terrified", "Worried"],
  "PAIN": ["Agony", "Devastated", "Grief", "Heartbroken", "Hurt", "Lonely", "Miserable", "Regretful", "Remorseful"],
  "SAD": ["Depressed", "Despondent", "Disappointed", "Discouraged", "Disheartened", "Dismayed", "Gloomy", "Heavy Hearted", "Hopeless", "Troubled", "Unhappy", "Wretched"],
  "STRESSED/TIRED": ["Burnt Out", "Depleted", "Exhausted", "Fatigued", "Listless", "Overwhelmed", "Restless", "Sleep", "Weary", "Worn Out"],
  "VULNERABLE": ["Fragile", "Guarded", "Helpless", "Insecure", "Leery", "Reserved", "Sensitive", "Shaky", "Tender"],
  "YEARNING": ["Envious", "Jealous", "Longing", "Pining", "Wishful"],
  "AFFECTION": ["Compassionate", "Friendly", "Loving", "Sympathetic", "Tender", "Warm"],
  "INTERESTED": ["Absorbed", "Alert", "Curious", "Enchanted", "Engaged", "Fascinated", "Intrigued", "Spellbound", "Stimulated"],
  "GLAD": ["Alive", "Amazed", "Amused", "Awed", "Encouraged", "Energetic", "Enthusiastic", "Excited", "Grateful", "Happy", "Hopeful", "Inspired", "Invigorated", "Joyful", "Motivated", "Optimistic", "Pleased", "Thrilled", "Wonder"],
  "GRATEFUL": ["Appreciative", "Moved", "Thankful", "Touched"],
  "HOPEFUL": ["Encouraged", "Expectant", "Optimistic"],
  "PEACEFUL": ["Calm", "Comfortable", "Centered", "Composed", "Content", "Fulfilled", "Relaxed", "Relieved", "Satisfied"],
  "RESTED": ["Alert", "Alive", "Energized", "Invigorated", "Refreshed", "Rejuvenated", "Relaxed", "Renewed", "Strong"]
};

function EmotionForm({ onSubmit }) {
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const navigate = useNavigate();

  const handleCheckboxChange = (emotion, category) => {
    setSelectedEmotions((prevSelected) => {
      const emotionObject = { emotion, category };
      const found = prevSelected.find((selectedEmotion) => selectedEmotion.emotion === emotion && selectedEmotion.category === category);
      if (found) {
        return prevSelected.filter((selectedEmotion) => selectedEmotion !== found);
      } else {
        return [...prevSelected, emotionObject];
      }
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(selectedEmotions);
    navigate("/list");
  };

  const isSubmitDisabled = selectedEmotions.length === 0;

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Container maxW="container.md">
        <Accordion allowMultiple>
          {Object.keys(emotionsData).map((category) => (
            <AccordionItem key={category}>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    {category}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Stack spacing={0}>
                  {emotionsData[category].map((emotion) => (
                    <Checkbox key={emotion} height="44px" onChange={() => handleCheckboxChange(emotion, category)}>
                      {emotion}
                    </Checkbox>
                  ))}
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
     
        <Flex position="sticky" bottom="0" bg="gray.700" width="100%" justify="center" px="4" py="2">
          <Button type="submit" isDisabled={isSubmitDisabled} flex="1" maxW="container.md">Share your feelings</Button>
        </Flex>

    </Box>
  );
}

export default EmotionForm;

