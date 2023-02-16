import { useCallback, useMemo, useState } from "react";
import { useAuth } from "../../context/auth-context";
import _axios from "../../_axios";

export default function useOrderStatus() {
  const { token } = useAuth();

  const [orderStatus, setOrderStatus] = useState([]);
  const [loading, setLoading] = useState(false);

  const baseHeader = useMemo(
    () => ({
      Authorization: "Bearer " + token,
    }),
    [token]
  );

  const getAll = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await _axios.get("statuses", {
        headers: baseHeader,
      });
      setOrderStatus(data.statuses || []);
    } catch (error) {
      return [];
    } finally {
      setLoading(false);
    }
  }, [baseHeader]);

  return {
    loading,
    getAll,
    orderStatus,
  };
}