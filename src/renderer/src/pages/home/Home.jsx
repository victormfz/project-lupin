import React, { useMemo, useState } from 'react';
import '../../styles/main.css';
import logo from '../../assets/img/logo-pqn.png';

// Ícone interno com uma API pequena e controlada por este arquivo.
// eslint-disable-next-line react/prop-types
const Icon = ({ name, size = 20 }) => {
  const paths = {
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    friends: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    mic: <><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3"/></>,
    headphones: <><path d="M4 14a8 8 0 0 1 16 0"/><path d="M18 19v-5h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2ZM6 19v-5H4a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h2Z"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21h-4v-.08A1.7 1.7 0 0 0 9 19.37a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.63 15 1.7 1.7 0 0 0 3.08 14H3v-4h.08A1.7 1.7 0 0 0 4.63 9a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.63 1.7 1.7 0 0 0 10 3.08V3h4v.08A1.7 1.7 0 0 0 15 4.63a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.37 9 1.7 1.7 0 0 0 20.92 10H21v4h-.08A1.7 1.7 0 0 0 19.4 15Z"/></>,
    message: <><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/><path d="M8 9h8M8 13h5"/></>,
    dots: <><circle cx="5" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="19" cy="12" r="1" fill="currentColor"/></>
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
};

// eslint-disable-next-line react/prop-types
const Avatar = ({ initials, gradient, status, large = false }) => (
  <span className={`avatar ${large ? 'avatar--large' : ''}`}>
    <span className="avatar-art" style={{ background: gradient }}>{initials}</span>
    {status && <i style={{ background: status }}/>}
  </span>
);

const friends = [
  { name: 'Luna Martins', initials: 'LM', handle: '@lunam', status: 'Jogando Stardew Valley', color: '#9c6cff', gradient: 'linear-gradient(135deg,#9c6cff,#40206f)' },
  { name: 'Theo Lima', initials: 'TL', handle: '@theolima', status: 'Ouvindo Arctic Monkeys', color: '#57d6a5', gradient: 'linear-gradient(135deg,#427d77,#172f45)' },
  { name: 'Maya Costa', initials: 'MC', handle: '@mayac', status: 'Disponível para conversar', color: '#f2b84b', gradient: 'linear-gradient(135deg,#db7f55,#6c294f)' },
  { name: 'Noah Alves', initials: 'NA', handle: '@noah.a', status: 'Ausente há 10 min', color: '#f2b84b', gradient: 'linear-gradient(135deg,#567bd4,#332564)' },
  { name: 'Sofia Reis', initials: 'SR', handle: '@so_reis', status: 'Offline', color: '#676a73', gradient: 'linear-gradient(135deg,#6c6f7d,#252733)' }
];

const servers = [
  { name: 'Café da noite', initials: 'CN', gradient: 'linear-gradient(135deg,#7b4b35,#251a22)' },
  { name: 'Game room', initials: 'GR', gradient: 'linear-gradient(135deg,#6936c8,#171b3d)' },
  { name: 'Design club', initials: 'DC', gradient: 'linear-gradient(135deg,#d64f91,#432369)' }
];

export default function Home() {
  const [query, setQuery] = useState('');
  const [selectedFriend, setSelectedFriend] = useState('Luna Martins');
  const filteredFriends = useMemo(() => friends.filter((friend) =>
    `${friend.name} ${friend.handle}`.toLowerCase().includes(query.toLowerCase())
  ), [query]);

  return (
    <div className="lupin-home">
      <aside className="server-rail" aria-label="Servidores">
        <button className="server-button server-button--active" title="Início"><img src={logo} alt="Lupin" /></button>
        <span className="server-divider" />
        {servers.map((server) => <button className="server-button" title={server.name} key={server.name}><span className="server-art" style={{ background: server.gradient }}>{server.initials}</span></button>)}
        <button className="server-button server-button--add" title="Adicionar servidor"><Icon name="plus" /></button>
      </aside>

      <aside className="friends-sidebar">
        <div className="friends-search"><Icon name="search" size={17}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Pesquisar amizades" /></div>
        <nav className="friends-nav">
          <button className="friends-nav-item active"><Icon name="friends"/> Amizades <span>{friends.length}</span></button>
          <button className="friends-nav-item"><Icon name="message"/> Mensagens</button>
        </nav>
        <div className="friends-heading"><span>Amigos — {filteredFriends.length}</span><button title="Adicionar amizade"><Icon name="plus" size={16}/></button></div>
        <div className="friends-list">
          {filteredFriends.map((friend) => (
            <button className={`friend-row ${selectedFriend === friend.name ? 'selected' : ''}`} key={friend.name} onClick={() => setSelectedFriend(friend.name)}>
              <Avatar initials={friend.initials} gradient={friend.gradient} status={friend.color}/>
              <span className="friend-copy"><strong>{friend.name}</strong><small>{friend.handle}</small></span>
            </button>
          ))}
          {!filteredFriends.length && <p className="empty-friends">Nenhuma amizade encontrada.</p>}
        </div>
        <div className="user-panel">
          <Avatar initials="V" gradient="linear-gradient(135deg,#6a2cd6,#241339)" status="#57d6a5"/>
          <span className="friend-copy"><strong>Fox</strong><small>#0001</small></span>
          <button title="Microfone"><Icon name="mic" size={17}/></button><button title="Áudio"><Icon name="headphones" size={17}/></button><button title="Configurações"><Icon name="settings" size={17}/></button>
        </div>
      </aside>

      <main className="home-main">
        <header className="home-topbar"><div><Icon name="friends"/><strong>Amizades</strong></div><span/><button className="topbar-tab active">Disponíveis</button><button className="topbar-tab">Todos</button><button className="topbar-tab">Pendentes</button><button className="add-friend">Adicionar amizade</button></header>
        <section className="welcome-area">
          <div className="welcome-copy"><span className="eyebrow">SEU ESPAÇO LUPIN</span><h1>Que bom ter você por aqui, Fox.</h1><p>Encontre alguém para conversar ou veja o que seus amigos estão fazendo agora.</p></div>
          <div className="online-title"><span>Disponíveis agora — 3</span></div>
          <div className="online-list">
            {friends.slice(0, 3).map((friend) => <article className="online-card" key={friend.name}><Avatar initials={friend.initials} gradient={friend.gradient} status={friend.color} large/><div><strong>{friend.name}</strong><p>{friend.status}</p></div><button title="Enviar mensagem"><Icon name="message" size={19}/></button><button title="Mais opções"><Icon name="dots" size={20}/></button></article>)}
          </div>
        </section>
      </main>

      <aside className="activity-panel">
        <div className="activity-header"><div><span className="activity-dot"/> ATIVIDADE AGORA</div><h2>O que está rolando</h2></div>
        <div className="activity-list">
          <article className="activity-card"><div className="activity-users"><Avatar initials="LM" gradient={friends[0].gradient}/><Avatar initials="MC" gradient={friends[2].gradient}/></div><div><strong>No canal Café & conversa</strong><p>Luna e Maya estão em uma chamada de voz</p><span className="live-label">● AO VIVO · 2 pessoas</span></div></article>
          <article className="activity-card"><div className="activity-cover">STARDEW VALLEY</div><div><strong>Stardew Valley</strong><p>Theo está jogando há 42 minutos</p><span className="purple-label">VER ATIVIDADE</span></div></article>
          <article className="activity-card activity-card--simple"><Avatar initials={friends[3].initials} gradient={friends[3].gradient} status={friends[3].color}/><div><strong>Noah Alves</strong><p>Ouvindo “505”</p><small>Arctic Monkeys</small></div></article>
        </div>
        <div className="activity-footer"><span>3 amigos ativos agora</span><div className="activity-avatars">{friends.slice(0, 3).map(f => <span key={f.name} style={{ background: f.gradient }}>{f.initials}</span>)}</div></div>
      </aside>
    </div>
  );
}
