'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import logo from '/public/Untitled_Artwork.png';

export default function MemberLookup() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [members, setMembers] = useState([]);

  const handleSearch = () => {
    const found = members.find(
      (member) => member.username.toLowerCase() === query.toLowerCase()
    );
    setResult(found || null);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const data = parseLuaTable(text);
        setMembers(data);
      } catch (error) {
        console.error('Failed to parse file:', error);
      }
    };
    reader.readAsText(file);
  };

  const parseLuaTable = (luaText) => {
    const lines = luaText.split('\n');
    const data = [];
