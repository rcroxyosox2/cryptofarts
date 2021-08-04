import { isInShit, addToShit, removeFromShit } from 'data/indexdb';
import { useLiveQuery } from "dexie-react-hooks";
import Button from 'theme/Button';

const AddRemoveShitButton = ({coinId}) => {
  
  const coinIsInShit = useLiveQuery(() => isInShit(coinId));

  const handleAddClick = () => {
    coinIsInShit ? removeFromShit(coinId) : addToShit(coinId);
  }

  return (
    <Button styleSize="small" onClick={handleAddClick} styleType={coinIsInShit ? 'bad' : 'neutral' } >
      {coinIsInShit ? "- remove from your shit" : "+ add to your shit" }
    </Button>
  );
};

export default AddRemoveShitButton;