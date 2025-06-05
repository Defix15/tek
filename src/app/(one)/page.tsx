'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-3xl"
      >
        <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">
          Добро пожаловать в Систему взаимодействия сотрудников SCloud!
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Управляйте задачами своей команды легко и удобно.
        </p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <motion.div
            variants={cardVariants}
            className="bg-blue-100 p-4 rounded-xl shadow-md"
          >
            <h2 className="font-semibold text-blue-900">Запланировано</h2>
            <ul className="mt-2 text-sm text-blue-800 space-y-1">
              <li>📌 Создать макет</li>
              <li>🛠️ Настроить проект</li>
            </ul>
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="bg-yellow-100 p-4 rounded-xl shadow-md"
          >
            <h2 className="font-semibold text-yellow-900">В процессе</h2>
            <ul className="mt-2 text-sm text-yellow-800 space-y-1">
              <li>✏️ Верстка главной</li>
            </ul>
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="bg-green-100 p-4 rounded-xl shadow-md"
          >
            <h2 className="font-semibold text-green-900">Готово</h2>
            <ul className="mt-2 text-sm text-green-800 space-y-1">
              <li>✅ Настройка Tailwind</li>
            </ul>
          </motion.div>
        </motion.div>

        <div className="flex justify-center">
          <motion.button
            onClick={() => router.push('/login')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            🚀 Начать работу
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
