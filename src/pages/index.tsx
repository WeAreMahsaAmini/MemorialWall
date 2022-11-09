import { useEffect, useState } from 'react';
import { useModal, Modal } from 'react-morphing-modal';
import 'react-morphing-modal/dist/ReactMorphingModal.css';

import Nav from 'components/Nav';
import NavItem from 'components/Nav/NavItem';
import List from 'components/List';
import ListItem from 'components/List/ListItem';
import PersonModal from 'components/Modal';

import { people } from 'data';

import type { Person } from 'types';

const Home = ({ people }: { people: Person[] }) => {
  const [person, setPerson] = useState<Person>();
  const { modalProps, open: openModal } = useModal();

  const onPersonClick = (
    ref: React.MutableRefObject<unknown>,
    person: Person
  ) => {
    openModal(ref);
    setPerson(person);
  };

  useEffect(() => {
    if (modalProps.state === 0) {
      setPerson(undefined);
    }
  }, [modalProps.state]);

  return (
    <div className="divide-y divide-slate-100">
      <Nav>
        <NavItem href="/" isActive>
          Lately Added
        </NavItem>
        <NavItem href="/">Sort by Age</NavItem>
        <NavItem href="/">Sort by Date</NavItem>
      </Nav>
      <List>
        {people.map((person) => (
          <ListItem key={person.id} person={person} onClick={onPersonClick} />
        ))}
      </List>

      <Modal {...modalProps}>{person && <PersonModal person={person} />}</Modal>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: {
      people,
    },
  };
}

export default Home;
