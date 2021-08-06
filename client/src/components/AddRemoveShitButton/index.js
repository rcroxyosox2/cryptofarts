import { isInShit, addToShit, getShit, removeFromShit } from 'data/indexdb';
import { useLiveQuery } from "dexie-react-hooks";
import { MAX_SHIT } from 'brains/coins';
import Button from 'theme/Button';

const AddRemoveShitButton = ({coinId}) => {
  
  const shit = useLiveQuery(() => getShit());
  const coinIsInShit = useLiveQuery(() => isInShit(coinId));
  const belowLimit = shit?.length <= MAX_SHIT;

  const AddButton = () => (
    <Button styleSize="small" onClick={() => addToShit(coinId)} styleType="neutral">
      + add to your shit
    </Button>
  );

  const RemoveButton = () => (
    <Button styleSize="small" onClick={() => removeFromShit(coinId)} styleType="bad">
      - remove from your shit
    </Button>
  );

  if (coinIsInShit) {
    return <RemoveButton />;
  }

  if (belowLimit) {
    return <AddButton />;
  }

  return null;
};

export default AddRemoveShitButton;