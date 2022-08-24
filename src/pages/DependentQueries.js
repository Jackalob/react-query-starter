import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const fetchUser = ({ queryKey }) =>
  axios.get(`http://localhost:4000/users/${queryKey[1]}`).then(res => res.data);

const fetchChannel = ({ queryKey }) =>
  axios.get(`http://localhost:4000/channels/${queryKey[1]}`).then(res => res.data);

function DependentQueries({ email }) {
  const { data: user } = useQuery({
    queryKey: ["user", email],
    queryFn: fetchUser,
  });

  const channelId = user?.channelId;

  const { data: channel } = useQuery({
    queryKey: ["channel", channelId],
    queryFn: fetchChannel,
    enabled: !!channelId,
  });

  return (
    <>
      <div>DependentQueries</div>
      {channel?.courses && <div>course: {JSON.stringify(channel.courses)}</div>}
    </>
  );
}

export default DependentQueries;
