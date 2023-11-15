import { formatDistanceToNow, parseISO } from "date-fns";

export const formatFromNow = (val) =>
  formatDistanceToNow(parseISO(val), { addSuffix: true });
