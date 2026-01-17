-- ============================================
-- Storage Bucket Policies for "letters-images"
-- ============================================
-- Supabase SQL Editor mein yeh queries run karo

-- 1. SELECT Policy (Public Read Access)
-- Frontend se images view karne ke liye public access
CREATE POLICY "Public can view letters images"
ON storage.objects FOR SELECT
USING (bucket_id = 'letters-images');

-- 2. INSERT Policy (Admin/Superadmin Upload)
-- Admin aur Superadmin ko upload karne ki permission
CREATE POLICY "Admin/Superadmin can upload letters images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'letters-images' AND
  auth.uid() IN (
    SELECT user_id FROM user_roles 
    WHERE role IN ('admin', 'superadmin')
  )
);

-- 3. UPDATE Policy (Admin/Superadmin Update)
-- Admin aur Superadmin ko update karne ki permission
CREATE POLICY "Admin/Superadmin can update letters images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'letters-images' AND
  auth.uid() IN (
    SELECT user_id FROM user_roles 
    WHERE role IN ('admin', 'superadmin')
  )
);

-- 4. DELETE Policy (Superadmin Only)
-- Sirf Superadmin ko delete karne ki permission
CREATE POLICY "Superadmin can delete letters images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'letters-images' AND
  auth.uid() IN (
    SELECT user_id FROM user_roles 
    WHERE role = 'superadmin'
  )
);






