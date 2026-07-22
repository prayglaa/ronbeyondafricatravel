
CREATE POLICY "Admins can view booking attachments"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'booking-attachments' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can upload booking attachments"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'booking-attachments' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update booking attachments"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'booking-attachments' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'booking-attachments' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete booking attachments"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'booking-attachments' AND public.has_role(auth.uid(), 'admin'));
